import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedCardComponent } from './breed-card.component';
import { breed } from '../../services/static';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('BreedCardComponent', () => {
  let component: BreedCardComponent;
  let fixture: ComponentFixture<BreedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedCardComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: of({ id: breed.id }) },
        },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render when breed input is truthy', () => {
    component.breed = breed;
    fixture.detectChanges()

    const element = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLElement;
    const elementImg = fixture.debugElement.query(By.css('img')).nativeElement as HTMLImageElement;
    const elementLink = fixture.debugElement.query(By.css('a')).nativeElement as HTMLAnchorElement;

    expect(elementLink.href).toContain(`/breed/${breed.id}`);
    expect(elementImg.src).toEqual(`https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg`);
    expect(element.textContent?.trim()).toContain(`${breed.name} - ${breed.origin}`);
  });

  it('should render when breed input is falsy', () => {
    const message = "Breed Not Found";
    const element = fixture.debugElement.query(By.css('div')).nativeElement as HTMLElement;
    expect(element.textContent).toContain(message);
  });
});
