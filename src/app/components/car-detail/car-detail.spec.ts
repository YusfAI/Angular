import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarDetail } from './car-detail';
import { CARS } from '../../data/cars';

describe('CarDetail', () => {
  let fixture: ComponentFixture<CarDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CarDetail] }).compileComponents();
    fixture = TestBed.createComponent(CarDetail);
    fixture.componentRef.setInput('car', CARS[0]);
    await fixture.whenStable();
  });

  it('renders the selected car', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h2')?.textContent).toContain(CARS[0].model);
  });

  it('emits closed when the close button is clicked', () => {
    let closed = false;
    fixture.componentInstance.closed.subscribe(() => (closed = true));
    (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('.close')!.click();
    expect(closed).toBe(true);
  });
});
