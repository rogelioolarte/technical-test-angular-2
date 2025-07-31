import { createActionGroup, createFeature, createReducer, on, props } from "@ngrx/store"
import Breed from "../models/breed";
import Pageable from "../models/pageable";

const BaseKeyState = "breeds";

interface State {
  breeds: Breed[],
  selectedBreed: Breed | null,
  selectedId: string,
  pageable: Pageable,
  error: string,
  loading: boolean
}

const initialState: State = {
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
}

const APIActions = createActionGroup({
  source: 'Breeds API',
  events: {
    loadTotalBreedsSuccess: props<{ totalElements: number, totalPages: number }>(),
    loadTotalBreedsFailure: props<{ error: string }>(),
    loadBreedsSuccess: props<{ breeds: Breed[] }>(),
    loadBreedsFailure: props<{ error: string }>(),
    getByIdSuccess: props<{ selectedBreed: Breed }>(),
    getByIdFailure: props<{ error: string }>(),
    searchByBreedNameSuccess: props<{ breeds: Breed[] }>(),
    searchByBreedNameFailure: props<{ error: string }>(),
  }
});

export const {
  loadBreedsSuccess, loadBreedsFailure,
  getByIdSuccess, getByIdFailure,
  searchByBreedNameSuccess, searchByBreedNameFailure,
  loadTotalBreedsFailure, loadTotalBreedsSuccess
} = APIActions;

const PageActions = createActionGroup({
  source: 'Breeds Page',
  events: {
    loadTotalBreeds: props<{ pageable: Pageable }>(),
    loadBreeds: props<{ pageable: Pageable }>(),
    getById: props<{ selectedId: string }>(),
    searchByBreedName: props<{ search: string }>(),
  }
});

export const { loadBreeds, getById, searchByBreedName, loadTotalBreeds } = PageActions;

const breedsReducer = createReducer(initialState,
  on(loadBreeds, (state, { pageable }) => ({ ...state, pageable, error: '', loading: true })),
  on(getById, (state, { selectedId }) => ({ ...state, selectedId, error: '', loading: true })),
  on(searchByBreedName, (state, { search }) =>
    ({ ...state, pageable: { ...state.pageable, search }, error: '', loading: true })),
  on(loadTotalBreeds, (state) => ({ ...state, error: '', loading: true })),

  on(loadTotalBreedsSuccess, (state, { totalElements, totalPages }) =>
    ({ ...state, pageable: { ...state.pageable, totalElements, totalPages }, loading: false })),
  on(loadTotalBreedsFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(loadBreedsSuccess, (state, { breeds }) => ({ ...state, breeds, loading: false })),
  on(loadBreedsFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(getByIdSuccess, (state, { selectedBreed }) => ({ ...state, selectedBreed, loading: false })),
  on(getByIdFailure, (state, { error }) => ({ ...state, error, loading: false })),

  on(searchByBreedNameSuccess, (state, { breeds }) => ({ ...state, breeds, loading: false })),
  on(searchByBreedNameFailure, (state, { error }) => ({ ...state, error, loading: false })),
);

export const breedsFeature = createFeature({
  name: BaseKeyState,
  reducer: breedsReducer
})

export const {
  name,
  reducer,
  selectBreeds,
  selectBreedsState,
  selectError,
  selectLoading,
  selectPageable,
  selectSelectedBreed,
  selectSelectedId
} = breedsFeature
