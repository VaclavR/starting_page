import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Favorite } from '../favorite.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as AppActions from '../store/app.actions';
import * as fromApp from '../store/app.reducers';
import { MenuItem } from '../menuItem.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sort-favorites',
  templateUrl: './sort-favorites.component.html',
  styleUrls: ['./sort-favorites.component.css']
})
export class SortFavoritesComponent implements OnInit {
  appState: Observable<fromApp.State>;
  darkTheme: boolean;
  favorites: Favorite[] = [];
  menuItems: MenuItem[] = [];
  info = false;

  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Starting page - Sort');
    this.route.params.subscribe((params: Params) => {
      this.store.dispatch(new AppActions.ReturnFilteredFavorites(params.id));
    });
    this.appState = this.store.select('app');
    this.appState.subscribe((data) => {
      this.favorites = data.favorites;
      this.darkTheme = data.darkTheme;
      this.menuItems = data.menuItems;
    });
  }

  saveSorted(favorites: Favorite[], menuItems: MenuItem[]) {
    this.info = true;
    const showInfo = setTimeout(() => this.info = false,
      500);
    this.store.dispatch(new AppActions.SaveSorted({favorites: favorites, menuItems: menuItems}));
  }

}
