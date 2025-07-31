import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CatApiService } from "../services/cat-api.service";
import { getById, getByIdFailure, getByIdSuccess, loadBreeds, loadBreedsFailure, loadBreedsSuccess, loadTotalBreeds, loadTotalBreedsFailure, loadTotalBreedsSuccess, searchByBreedName, searchByBreedNameFailure, searchByBreedNameSuccess } from "./breeds.state";
import { catchError, exhaustMap, map, of } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

const defaultMessageError = "Error while using the API";

export const loadTotalBreedsEffect = createEffect(
  (actions$ = inject(Actions), api = inject(CatApiService)) => {
    return actions$.pipe(
      ofType(loadTotalBreeds),
      exhaustMap(({ pageable }) => {
        return api.getBreeds().pipe(
          map((breeds) => loadTotalBreedsSuccess({
            totalElements: breeds.length,
            totalPages: Math.ceil(breeds.length/(pageable.limit))
          })),
          catchError((error: HttpErrorResponse) =>
            of(loadTotalBreedsFailure({ error: error.message ?? defaultMessageError })))
        )
      })
    )
  }, { functional: true });

export const loadBreedsEffect = createEffect(
  (actions$ = inject(Actions), api = inject(CatApiService)) => {
    return actions$.pipe(
      ofType(loadBreeds),
      exhaustMap(({ pageable }) => {
        return api.getBreedsWithPage(pageable).pipe(
          map((breeds) => loadBreedsSuccess({ breeds })),
          catchError((error: HttpErrorResponse) =>
            of(loadBreedsFailure({ error: error.message ?? defaultMessageError })))
        )
      })
    )
  }, { functional: true });

export const getByIdEffect = createEffect(
(actions$ = inject(Actions), api = inject(CatApiService)) => {
  return actions$.pipe(
    ofType(getById),
    exhaustMap(({ selectedId }) => {
      return api.getBreedById(selectedId).pipe(
        map((selectedBreed) => getByIdSuccess({ selectedBreed })),
        catchError((error: HttpErrorResponse) =>
          of(getByIdFailure({ error: error.message ?? defaultMessageError })))
      )
    })
  )
}, { functional: true });

export const searchWithBreedNameEffect = createEffect(
(actions$ = inject(Actions), api = inject(CatApiService)) => {
  return actions$.pipe(
    ofType(searchByBreedName),
    exhaustMap(({ search }) => {
      return api.searchByBreedName({ search }).pipe(
        map((breeds) => searchByBreedNameSuccess({ breeds })),
        catchError((error: HttpErrorResponse) =>
          of(searchByBreedNameFailure({ error: error.message ?? defaultMessageError })))
      )
    })
  )
}, { functional: true });
