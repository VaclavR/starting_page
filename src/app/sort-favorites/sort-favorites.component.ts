import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Favorite } from '../favorite.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as AppActions from '../store/app.actions';

@Component({
  selector: 'app-sort-favorites',
  templateUrl: './sort-favorites.component.html',
  styleUrls: ['./sort-favorites.component.css']
})
export class SortFavoritesComponent implements OnInit {
  appState: Observable<{favorites: Favorite[]}>;
  favorites: Favorite[] = [];
  info = false;

  constructor(private store: Store<{app: {favorites: Favorite[]}}>,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.store.dispatch(new AppActions.ReturnFilteredFavorites(params.id));
    });
    this.appState = this.store.select('app');
    this.appState.subscribe((data) => {
      this.favorites = data.favorites;
    });
  }

  saveSorted(favorites: Favorite[]) {
    this.info = true;
    const showInfo = setTimeout(() => this.info = false,
      500);
    this.store.dispatch(new AppActions.SaveSortedFavorites(this.favorites));
    // this.router.navigate(['/']);
  }

}
