import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBar } from './search-bar';
import { CARS } from '../../../data/cars';

describe('SearchBar', () => {
  let component: SearchBar;
  let fixture: ComponentFixture<SearchBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBar],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBar);
    fixture.componentRef.setInput('autos', CARS);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('shows all cars when no filter is set', () => {
    expect(component.selectedAutos().length).toBe(CARS.length);
  });

  it('matches the search text against brand and model', () => {
    component.query.set('q5');
    expect(component.selectedAutos().map((a) => a.model)).toEqual(['Q5']);

    component.query.set('audi');
    expect(component.selectedAutos().every((a) => a.brand === 'Audi')).toBe(true);
  });

  it('filters by brand and sorts by price', () => {
    component.brand.set('BMW');
    component.setSort('price-asc');
    const prices = component.selectedAutos().map((a) => a.price);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
    expect(component.selectedAutos().every((a) => a.brand === 'BMW')).toBe(true);
  });

  it('reset clears every filter', () => {
    component.query.set('zzz');
    expect(component.selectedAutos().length).toBe(0);
    component.reset();
    expect(component.selectedAutos().length).toBe(CARS.length);
  });
});
