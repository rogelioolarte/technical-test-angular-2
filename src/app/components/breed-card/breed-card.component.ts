import { Component, Input } from '@angular/core';
import Breed from '../../models/breed';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breed-card',
  imports: [RouterLink],
  template: `
    @if(breed) {
      <div class="card bg-base-100 h-70 w-50 shadow-sm">
        <figure>
          <img
            class="w-50 h-50 object-cover"
            [src]="imageUrl(breed.reference_image_id)"
            [alt]="breed.alt_names ?? 'image of a cat'" />
        </figure>
        <div class="card-body">
          <a [routerLink]="['/breed', breed.id]" >
            <h2 class="card-title">{{ breed.name }} - {{ breed.origin }}</h2>
          </a>
        </div>
      </div>
    } @else {
      <div class="card bg-base-100 w-96 shadow-sm">Breed Not Found</div>
    }
  `,
  styles: ``
})
export class BreedCardComponent {
  @Input() breed?: Breed;
  readonly imageUrl = (id?: string) => id ? `https://cdn2.thecatapi.com/images/${id}.jpg` : '';
}
