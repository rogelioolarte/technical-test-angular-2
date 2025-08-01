import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit when input have a value', fakeAsync(() => {
    spyOn(component.searchPayload, 'emit');
    const elementInput = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

    elementInput.value = 'ab';
    elementInput.dispatchEvent(new Event('input'));
    tick();

    expect(component.searchPayload.emit).toHaveBeenCalledWith('ab');
  }));

  it('should no emit when emitted value equals current', fakeAsync(() => {
    spyOn(component.searchPayload, 'emit');

    component.form.setValue({ search: 'hello' });
    tick();

    component.form.setValue({ search: 'hello' });
    tick();

    expect(component.searchPayload.emit).toHaveBeenCalledTimes(2);
  }));
});
