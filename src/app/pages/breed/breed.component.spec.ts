import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedComponent } from './breed.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import Breed from '../../models/breed';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { breed } from '../../services/static';
import { selectSelectedBreed } from '../../store/breeds.state';
import { By } from '@angular/platform-browser';

describe('BreedComponent', () => {
  let component: BreedComponent;
  let fixture: ComponentFixture<BreedComponent>;
  let store: MockStore;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockselectSelectedBreed: MemoizedSelector<Record<string, any>, Breed | null, DefaultProjectorFn<Breed | null>>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedComponent],
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
    mockselectSelectedBreed = store.overrideSelector(selectSelectedBreed, null);
    fixture = TestBed.createComponent(BreedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render succesfull response when Component have selectedBreed', () => {
    mockselectSelectedBreed.setResult(breed);
    store.refreshState();
    fixture.detectChanges();

    const elements = fixture.debugElement.queryAll(By.css('p'));
    const elementImg = fixture.debugElement.query(By.css('img')).nativeElement as HTMLImageElement;
    const firstElement = elements[0].nativeElement as HTMLParagraphElement;
    const secondElement = elements[1].nativeElement as HTMLParagraphElement;

    expect(elements.length).toEqual(2);
    expect(elementImg.src).toEqual(`https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`);
    expect(firstElement.textContent?.trim()).toContain(breed.origin);
    expect(secondElement.textContent?.trim()).toContain(breed.description);
  });

  it('should render failed response when Component no have selectedBreed', () => {
    mockselectSelectedBreed.setResult(null);
    store.refreshState();
    fixture.detectChanges();

    const message = "Breed Not Found";
    const element = fixture.debugElement.query(By.css('p')).nativeElement as HTMLParagraphElement;

    expect(element.textContent?.trim()).toContain(message);
    expect(component.id()).toBe('1');
    expect(component.breed$()).toBe(null);
  });
});
