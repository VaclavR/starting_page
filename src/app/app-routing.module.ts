
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SortFavoritesComponent } from './sort-favorites/sort-favorites.component';

const routes: Routes = [
  { path: '', redirectTo: '/all', pathMatch: 'full'},
  { path: 'all', component: ListComponent },
  { path: 'sort', component: SortFavoritesComponent},
  { path: ':id', component: ListComponent},
  { path: '**', redirectTo: '/all'}, // doesn't work with path: 'id' before.
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
