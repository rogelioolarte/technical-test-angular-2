import { Routes } from '@angular/router';
import { BreedsComponent } from './pages/breeds/breeds.component';
import { BreedComponent } from './pages/breed/breed.component';

export const routes: Routes = [
  { path: '', redirectTo: '/breeds', pathMatch: 'full' },
  { path: 'breeds', component: BreedsComponent, title: 'Cats Breeds' },
  { path: 'breed/:id', component: BreedComponent,
    title: (route) => (`Cat Breed - ${(route.params['id'] as string).toLocaleUpperCase()}`) },
  { path: '**', redirectTo: '/breeds' },
];
