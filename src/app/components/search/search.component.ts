import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'

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
        <input type="search" class="grow" placeholder="Search" />
        @if(form.invalid && form.dirty && form.touched) {
          <span class="text-error" >Need at least 3 characteres for search</span>
        }
      </label>
    </form>

  `,
  styles: ``
})
export class SearchComponent {
  form!: FormGroup;
  @Output() searchPayload = new EventEmitter<string>();

  constructor() {
    this.form = new FormGroup({
      search: new FormControl('', Validators.minLength(3))
    })
  }

  submit() {
    if(this.form.valid) {
      this.searchPayload.emit(this.form.getRawValue()['search'] as string);
    }
    return;
  }
}
