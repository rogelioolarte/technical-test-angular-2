import { TestBed } from '@angular/core/testing';

import { CatApiService } from './cat-api.service';
import { HttpErrorResponse, provideHttpClient, withFetch } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { breed } from './static';
import { firstValueFrom } from 'rxjs';

describe('CatApiService', () => {
  let httpTesting: HttpTestingController;
  let service: CatApiService;
  const mockResponse = [ breed ];
  const mockErrorResponse = { message: 'Error while using the API' };
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
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  })

  it('getBreeds should be returned a success response', async () => {
    // Given
    const getBreeds = firstValueFrom(service.getBreeds());
    const req = httpTesting.expectOne({ url: `${base_url_api}/v1/breeds`, method: 'GET' });
    expect(req.request.method).toBe('GET');
    // When
    req.flush(mockResponse);
    // Then
    expect(await getBreeds).toEqual(mockResponse);
  });

  it('getBreeds should be returned a failed response', async () => {
    // Given
    service.getBreeds().subscribe({
      next: () => fail(),
      error: (error: HttpErrorResponse) => {
        expect(error.error).toEqual(mockErrorResponse);
        expect(error.status).toBe(500);
        expect(error.statusText).toBe("Server Error");
      }
    });
    const req = httpTesting.expectOne({ url: `${base_url_api}/v1/breeds`, method: 'GET' });
    expect(req.request.method).toBe('GET');
    // When
    req.flush(mockErrorResponse, { status: 500, statusText: 'Server Error' });
  });

  it('getBreedsWithPage should be returned a success response', async () => {
    // Given
    const reqParams = { limit: 10, page: 0, search: '', totalElements: 50, totalPages: 5 };
    const getBreedsWithPage = firstValueFrom(service.getBreedsWithPage(reqParams));
    const req = httpTesting.expectOne({
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
    const req = httpTesting.expectOne({
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
    const req = httpTesting.expectOne({
      url: `${base_url_api}/v1/breeds/${id}`, method: 'GET' });
    expect(req.request.method).toBe('GET');
    expect(req.request.url).toEqual(`${base_url_api}/v1/breeds/${id}`);
    // When
    req.flush(mockResponse[0]);
    // Then
    expect(await getBreedsById).toEqual(mockResponse[0]);
  });

});
