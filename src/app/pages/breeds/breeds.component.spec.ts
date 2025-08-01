import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedsComponent } from './breeds.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { selectBreeds, selectError, selectPageable } from '../../store/breeds.state';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import Breed from '../../models/breed';
import Pageable from '../../models/pageable';
import { breed } from '../../services/static';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('BreedsComponent', () => {
  let component: BreedsComponent;
  let fixture: ComponentFixture<BreedsComponent>;
  let store: MockStore;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockselectBreeds: MemoizedSelector<any, Breed[], DefaultProjectorFn<Breed[]>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockselectPageable: MemoizedSelector<any, Pageable, DefaultProjectorFn<Pageable>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockselectError: MemoizedSelector<Record<string, any>, string, DefaultProjectorFn<string>>;
  const initialState = {
    breeds: [],
    pageable: {
      limit: 15,
      page: 0,
      search: '',
      totalElements: 0,
      totalPages: 1
    },
    selectedBreed: null,
    selectedId: '',
    error: '',
    loading: false
  };
  const mockPageable = { limit: 15, page: 0, search: '', totalElements: 1, totalPages: 1 };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedsComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: '1' }) },
        },
      ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BreedsComponent);
    component = fixture.componentInstance;
    mockselectBreeds = store.overrideSelector(selectBreeds, initialState.breeds);
    mockselectPageable = store.overrideSelector(selectPageable, initialState.pageable);
    mockselectError = store.overrideSelector(selectError, initialState.error);
    fixture.detectChanges();
    spyOn(store, 'dispatch');
  });

  it('should obtain successfull response', () => {
    mockselectBreeds.setResult([ breed ]);
    mockselectPageable.setResult(mockPageable);
    store.refreshState();
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('.card'));
    const elementImg = elements[0].query(By.css('img')).nativeElement as HTMLImageElement;
    const elementText = elements[0].query(By.css('h2')).nativeElement as HTMLElement;
    const text = elementText.textContent?.trim() ?? '';

    expect(component.breeds()[0]).toEqual(breed);
    expect(component.pageable()).toEqual(mockPageable);
    expect(elements.length).toBe(1);
    expect(elementImg.src).toBe(`https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`);
    expect(text).toContain(breed.name);
    expect(text).toContain(breed.origin);
  });

  it('should obtain failed response', () => {
    const errorMessage = "Error while using the API.";
    const failedPageable = {limit: 15, page: 0, search: '', totalElements: 0, totalPages: 0 };
    mockselectBreeds.setResult([]);
    mockselectPageable.setResult(failedPageable);
    mockselectError.setResult(errorMessage);
    store.refreshState();
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('p')).nativeElement as HTMLElement;
    const text = element.textContent?.trim() ?? '';

    expect(component.breeds()).toEqual([]);
    expect(component.pageable()).toEqual(failedPageable);
    expect(text).toContain(errorMessage);
  });

  it('should obtain empty response', () => {
    const message = "There are no cat breeds available.";
    mockselectBreeds.setResult([]);
    mockselectPageable.setResult(mockPageable);
    store.refreshState();
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('p')).nativeElement as HTMLElement;
    const text = element.textContent?.trim() ?? '';

    expect(component.breeds()).toEqual([]);
    expect(component.pageable()).toEqual(mockPageable);
    expect(text).toContain(message);
  });
});
