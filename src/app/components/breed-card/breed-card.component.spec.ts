import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedCardComponent } from './breed-card.component';

describe('BreedCardComponent', () => {
  let component: BreedCardComponent;
  let fixture: ComponentFixture<BreedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreedCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
