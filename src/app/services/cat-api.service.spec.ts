import { TestBed } from '@angular/core/testing';

import { CatApiService } from './cat-api.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { breed } from './static';
import { firstValueFrom } from 'rxjs';

describe('CatApiService', () => {
  let httpController: HttpTestingController;
  let service: CatApiService;
  const fakeResponse = [ breed ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
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
    // given
    const req = httpController.expectOne({ url: '/v1/breeds', method: 'GET' });
    const res = firstValueFrom(service.getBreeds());
    expect(req.request.method).toBe('GET');
    // when
    req.flush(fakeResponse);
    // then
    expect(await res).toEqual(fakeResponse);
  });
});
