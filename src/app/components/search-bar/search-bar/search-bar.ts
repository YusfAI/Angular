import { Component, computed, EventEmitter, input, Output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../../interface/auto';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'power-desc';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-search-bar',
  styleUrl: './search-bar.css',
  templateUrl: './search-bar.html',
})
export class SearchBar {
  readonly faMagnifyingGlass = faMagnifyingGlass;
  readonly faXmark = faXmark;

  readonly autos = input<Auto[]>([]);
  @Output() onSelectCar = new EventEmitter<Auto>();

  readonly query = signal('');
  readonly brand = signal('');
  readonly sort = signal<SortOption>('default');

  /** Distinct brands, used to fill the brand filter. */
  readonly brands = computed(() => [...new Set(this.autos().map((a) => a.brand))].sort());

  /** Cars matching the search text (brand or model) and brand filter, in the chosen order. */
  readonly selectedAutos = computed(() => {
    const q = this.query().trim().toLowerCase();
    const brand = this.brand();

    const filtered = this.autos().filter((a) => {
      const matchesText =
        !q || a.brand.toLowerCase().includes(q) || a.model.toLowerCase().includes(q);
      const matchesBrand = !brand || a.brand === brand;
      return matchesText && matchesBrand;
    });

    switch (this.sort()) {
      case 'price-asc':
        return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filtered].sort((a, b) => b.price - a.price);
      case 'power-desc':
        return [...filtered].sort((a, b) => b.power - a.power);
      default:
        return filtered;
    }
  });

  setSort(value: string) {
    this.sort.set(value as SortOption);
  }

  reset() {
    this.query.set('');
    this.brand.set('');
    this.sort.set('default');
  }

  selectCar(auto: Auto) {
    this.onSelectCar.emit(auto);
  }
}
