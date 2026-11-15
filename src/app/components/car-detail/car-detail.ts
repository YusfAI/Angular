import { Component, EventEmitter, HostListener, input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Auto } from '../../interface/auto';

@Component({
  imports: [FontAwesomeModule],
  selector: 'app-car-detail',
  styleUrl: './car-detail.css',
  templateUrl: './car-detail.html',
})
export class CarDetail {
  readonly faXmark = faXmark;

  readonly car = input.required<Auto>();
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  close() {
    this.closed.emit();
  }
}
