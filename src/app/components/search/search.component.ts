import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" class="grid grid-cols-1" >
      <label class="input">
        <svg class="h-[1em] opacity-50" viewBox="0 0 24 24">
          <g
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input type="search" formControlName="search" class="grow"
          placeholder="Search By Breed name" />
      </label>
    </form>

  `,
  styles: ``
})
export class SearchComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  @Output() searchPayload = new EventEmitter<string>();
  private sub!: Subscription;

  constructor() {
    this.form = new FormGroup({ search: new FormControl('') })
  }

  ngOnInit(): void {
    this.sub = this.form.valueChanges.subscribe(() => this.submit());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  submit() {
    if(this.form.valid) {
      this.searchPayload.emit(this.form.getRawValue()['search'] as string);
    }
    return;
  }
}
