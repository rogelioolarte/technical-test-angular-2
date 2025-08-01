import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBreeds, loadTotalBreeds, searchByBreedName, selectBreeds, selectError, selectLoading, selectPageable } from '../../store/breeds.state';
import { BreedCardComponent } from "../../components/breed-card/breed-card.component";
import { SearchComponent } from "../../components/search/search.component";

@Component({
  selector: 'app-breeds',
  imports: [BreedCardComponent, SearchComponent],
  template: `
    <div class="flex flex-col gap-10 my-10 " >
      <h1 class="mx-auto" >Cat Breeds Viewer - Page {{ pageable().page+1 }}</h1>
      <app-search (searchPayload)="onSearch($event)" class="mx-auto" />
      @if(error()) {
        <p class="text-error text-sm mx-auto" >{{ error() }}</p>
      }
      @if(!isLoading()) {
        <div class="grid grid-cols-3 max-w-4/5 gap-5 mx-auto" >
          @if(breeds().length > 0) {
            @for(breed of breeds(); track breed.id) {
              <app-breed-card [breed]="breed" />
            }
          } @else {
            <p>There are no cat breeds available.</p>
          }
        </div>
      } @else {
        <p class="mx-auto" >Loading...</p>
      }
      @if(pageable().totalPages > 0) {
        <div class="flex flex-row mx-auto" >
          <div (click)="onPreviousPage()" aria-hidden="true"
            [class]="(pageable().page) > 0 ? 'btn': 'btn btn-disabled'" > < </div>
          <div class="btn btn-disabled" >{{ pageable().page+1 }}</div>
          <div (click)="onNextPage()" aria-hidden="true"
            [class]="(pageable().page) <= (pageable().totalPages) ?
            'btn': 'btn btn-disabled'" > >
          </div>
        </div>
      }
    </div>
  `,
  styles: ``
})
export class BreedsComponent implements OnInit {
  store = inject(Store);
  breeds = this.store.selectSignal(selectBreeds);
  pageable = this.store.selectSignal(selectPageable);
  isLoading = this.store.selectSignal(selectLoading);
  error = this.store.selectSignal(selectError);

  applyPageable({
    limit = 15,
    page = this.pageable().page,
    search = this.pageable().search
  }: { limit?: number, page?: number, search?: string }) {
    this.store.dispatch(loadBreeds({ pageable: {
      limit, page, search,
      totalElements: this.pageable().totalElements,
      totalPages: this.pageable().totalPages
    }}));
  }

  ngOnInit(): void {
    this.store.dispatch(loadTotalBreeds({ pageable: this.pageable() }));
    this.applyPageable({ limit: 15, page: this.pageable().page });
  }

  onSearch(search: string) {
    if(search) {
      this.store.dispatch(searchByBreedName({ search }));
    }
    this.applyPageable({ search });
  }

  onPreviousPage() {
    if((this.pageable().page ?? 0) > 0) {
      this.applyPageable({ page: (this.pageable().page ?? 1) - 1 });
    }
  }

  onNextPage() {
    if(this.pageable().page >= 0 &&
      (this.pageable().page ?? 0) <= ((this.pageable().totalPages ?? 0)-1)) {
      this.applyPageable({ page: (this.pageable().page) + 1 });
    }
  }

}
