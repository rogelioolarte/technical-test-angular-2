import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Breed from '../models/breed';
import Pageable from '../models/pageable';

@Injectable({
  providedIn: 'root'
})
export class CatApiService {
  private http = inject(HttpClient);
  private base_url_api = "https://api.thecatapi.com";

  getBreeds() {
    return this.http.get<Breed[]>(`${this.base_url_api}/v1/breeds`);
  }

  getBreedsWithPage({ limit, page }: Pageable) {
    return this.http.get<Breed[]>(`${this.base_url_api}/v1/breeds?limit=${limit}&page=${page}`);
  }

  searchByBreedName({ search }: { search: string }) {
    return this.http.get<Breed[]>(`${this.base_url_api}/v1/breeds/search?q=${search}`);
  }

  getBreedById(id: string) {
    return this.http.get<Breed>(`${this.base_url_api}/v1/breeds/${id}`);
  }
}
