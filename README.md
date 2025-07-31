# 🐱 Cat Breeds Viewer – Angular Technical Test (Junior Level)

## Description

Angular technical test focused on consuming **The Cat API**, which allows you to display cat images and a breed list. It is designed as a junior-level technical exercise, with a focus on structure, clarity, and best practices.

## Motivation

This project aims to demonstrate essential capabilities in Angular: HTTP consumption, state management, structured templates, reactive forms, and unit testing. It is intended as a realistic technical evaluation.

---

## Angular Topics Covered

1. **State**
You can choose between:

* Using **Signals** for reactive state within components.
* Using **NgRx Store** for global state management.

2. **Templates**
Only the following structural directives will be used:

* `@if / @else`
* `@for`
* `@defer`
* `@placeholder`

- This demonstrates control flow in templates without additional complexity.

3. **Forms**
Only **reactive forms** (`ReactiveFormsModule`), for example, a breed search field with simple validation: required, minimum characters, etc.

4. **HTTP / DI / Routing**

* Injectable service with `HttpClient` consuming the `/v1/breeds` endpoints.
* Main routes: `/`, `/breeds`, `/breeds/:id`.
* Modules and services provided via DI in `@Injectable({providedIn: 'root'})`.

5. **Unit Testing**

* API service: Test with `HttpTestingController`, verifying correct calls and error handling.
* Components: Test with fakes or stubs, template structure verification, conditional rendering, and form behavior.

---

## Project Structure

```plain
src/
├─ app/
│ ├─ components/
| | └─ breed-card/
│ ├─ pages/
│ │ └─ create-breed/ 
│ │ └─ breed/ 
│ │ └─ breeds/ 
│ ├─ services/ 
│ │ └─ cat-api.service.ts 
│ ├─ state/ // If you use NgRx 
│ ├─ app.route.ts 
│ └─ app.config.ts
```

---

##Code examples

### Service

/\* cat-api.service.ts \*/

```ts
@Injectable({providedIn:'root'})
export class CatApiService { 
getBreeds() { } 
getBreedById() { } 
searchBreeds() { }
}
```

### Reactive form

```ts
searchForm = new FormGroup({ 
breedName: new FormControl('', [Validators.required, Validators.minLength(25)]), 
breedDescription: new FormControl('', [Validators.required, Validators.minLength(200)]), 
breedImageUrl: new FormControl('', [Validators.required, Validators.minLength(200)]),
});
```

### Unit Tests (Service)

```ts
it('should load breeds', () => {
service.getBreeds().subscribe(data => expect(data).toEqual(mockBreeds));
const req = httpMock.expectOne('/v1/breeds');
req.flush(mockBreeds);
});
```

## Delivery Requirements

* Public repository with complete code.
* Functional implementation with Signals or NgRx, declarative templates, reactive form, navigation, and minimal but representative unit tests.

---

## Technologies Used
 - Angular 19
 - NgRx 19
