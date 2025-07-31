import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Store } from '@ngrx/store'
import { getById, selectSelectedBreed } from '../../store/breeds.state';
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-breed',
  imports: [],
  template: `
    @let breed = breed$();
    @if(breed) {
      <div class="card bg-base-100 w-96 shadow-sm mx-auto my-10 ">
        <figure>
          <img
            [src]="imageUrl(breed.reference_image_id)"
            [alt]="breed.alt_names ?? 'image of a cat'" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{{ breed.name }}</h2>
          <p>Origin:  {{ breed.origin }}</p>
          <p>Description:  {{ breed.description }}</p>
        </div>
      </div>
    } @else {
      <div class="card bg-base-100 w-96 shadow-sm">Breed Not Found</div>
    }
  `,
  styles: ``
})
export class BreedComponent implements OnInit {
  readonly imageUrl = (id?: string) => id ? `https://cdn2.thecatapi.com/images/${id}.jpg` : '';

  router = inject(Router);
  store = inject(Store);
  route = inject(ActivatedRoute);
  id = toSignal(this.route.params.pipe(map(v => String(v['id']))));
  breed$ = this.store.selectSignal(selectSelectedBreed);

  ngOnInit(): void {
    this.store.dispatch(getById({ selectedId: this.id() ?? '1' }));
  }
}
