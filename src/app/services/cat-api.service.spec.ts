import { TestBed } from '@angular/core/testing';

import { CatApiService } from './cat-api.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { breed } from './static';
import { firstValueFrom } from 'rxjs';

describe('CatApiService', () => {
  let httpController: HttpTestingController;
  let service: CatApiService;
  const mockResponse = [ breed ];
  const base_url_api = "https://api.thecatapi.com";

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CatApiService,
        provideHttpClient(withFetch()),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(CatApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  })

  it('getBreeds should be returned a success response', async () => {
    // Given
    const getBreeds = firstValueFrom(service.getBreeds());
    const req = httpController.expectOne({ url: `${base_url_api}/v1/breeds`, method: 'GET' });
    expect(req.request.method).toBe('GET');
    // When
    req.flush(mockResponse);
    // Then
    expect(await getBreeds).toEqual(mockResponse);
  });

  it('getBreedsWithPage should be returned a success response', async () => {
    // Given
    const reqParams = { limit: 10, page: 0, search: '', totalElements: 50, totalPages: 5 };
    const getBreedsWithPage = firstValueFrom(service.getBreedsWithPage(reqParams));
    const req = httpController.expectOne({
      url: `${base_url_api}/v1/breeds?limit=${reqParams.limit}&page=${reqParams.page}`,
      method: 'GET' });
    expect(req.request.method).toBe('GET');
    expect(req.request.url).toEqual(`${base_url_api}/v1/breeds?limit=${reqParams.limit}&page=${reqParams.page}`);
    // When
    req.flush(mockResponse);
    // Then
    expect(await getBreedsWithPage).toEqual(mockResponse);
  });

  it('searchByBreedName should be returned a success response', async () => {
    // Given
    const reqParams = { search: '' };
    const searchBreedByName = firstValueFrom(service.searchByBreedName(reqParams));
    const req = httpController.expectOne({
      url:`${base_url_api}/v1/breeds/search?q=${reqParams.search}`, method: 'GET' });
    expect(req.request.method).toBe('GET');
    expect(req.request.url).toEqual(`${base_url_api}/v1/breeds/search?q=${reqParams.search}`);
    // When
    req.flush(mockResponse);
    // Then
    expect(await searchBreedByName).toEqual(mockResponse);
  });

  it('getBreedById should be returned a success response', async () => {
    // Given
    const id = "abys";
    const getBreedsById = firstValueFrom(service.getBreedById(id));
    const req = httpController.expectOne({
      url: `${base_url_api}/v1/breeds/${id}`, method: 'GET' });
    expect(req.request.method).toBe('GET');
    expect(req.request.url).toEqual(`${base_url_api}/v1/breeds/${id}`);
    // When
    req.flush(mockResponse[0]);
    // Then
    expect(await getBreedsById).toEqual(mockResponse[0]);
  });

});
