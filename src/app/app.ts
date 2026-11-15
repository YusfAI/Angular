import { Component, signal } from '@angular/core';
import { HeadBar } from './components/head-bar/head-bar';
import { SearchBar } from './components/search-bar/search-bar/search-bar';
import { CarDetail } from './components/car-detail/car-detail';
import { Auto } from './interface/auto';
import { CARS } from './data/cars';

@Component({
  imports: [HeadBar, SearchBar, CarDetail],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('My Showroom');

  readonly autolist: Auto[] = CARS;
  readonly selectedCar = signal<Auto | null>(null);

  selectCar(auto: Auto) {
    this.selectedCar.set(auto);
  }

  closeDetail() {
    this.selectedCar.set(null);
  }
}
