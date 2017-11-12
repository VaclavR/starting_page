import { Component, OnInit } from '@angular/core';
import { Favorite } from '../favorite.model';
import { ActivatedRoute, Params } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';
import { FormModalComponent } from './favorite-form-modal/favorite-form-modal.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MenuItem } from '../menuItem.model';
import * as fromApp from '../store/app.reducers';
import * as AppActions from '../store/app.actions';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  appState: Observable<fromApp.State>;
  darkTheme: boolean;
  menuItems: MenuItem[];
  favorites: Favorite[];
  titleName: string;
  config = {
    keyboard: false,
    ignoreBackdropClick: true
  };

  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private modalService: BsModalService,
              private titleService: Title) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.id !== undefined) {
        this.store.dispatch(new AppActions.ReturnFilteredFavorites(params.id));
      } else {
        this.store.dispatch(new AppActions.ReturnFilteredFavorites('all'));
      }

    });
    this.appState = this.store.select('app');
    this.appState.subscribe((data) => {
      this.menuItems = data.menuItems;
      this.favorites = data.favorites;
      this.darkTheme = data.darkTheme;
      this.titleName = data.activeRoute;
      if (this.titleName) {
        this.titleService.setTitle('Starting page - ' + this.titleName);
      } else {
        this.titleService.setTitle('Starting page - all');
      }
    });
  }

  onShowForm() {
    this.store.dispatch(
      new AppActions.ActiveModal({show: true, component: 'FormModalComponent'}));
    this.store.dispatch(
      new AppActions.FavoriteEditModeChanged({favoriteEditMode: false}));
    this.modalService.show(FormModalComponent, this.config);
  }

}
