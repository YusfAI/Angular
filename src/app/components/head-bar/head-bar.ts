import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-head-bar',
  styleUrl: './head-bar.css',
  templateUrl: './head-bar.html',
})
export class HeadBar {
  readonly title = input('My Showroom');
  readonly carCount = input(0);
}
