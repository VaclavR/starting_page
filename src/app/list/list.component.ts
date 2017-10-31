import { Component, OnInit } from '@angular/core';
import { Favorite } from '../favorite.model';
import { ActivatedRoute, Params } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';
import { FormModalComponent } from './form-modal/form-modal.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { MenuItem } from '../menuItem.model';
import * as fromApp from '../store/app.reducers';
import * as AppActions from '../store/app.actions';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  appState: Observable<fromApp.State>;
  menuItems: MenuItem[];
  favorites: Favorite[];

  constructor(private store: Store<fromApp.AppState>,
              private route: ActivatedRoute,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.store.dispatch(new AppActions.ReturnFilteredFavorites(params.id));
    });
    this.appState = this.store.select('app');
    this.appState.subscribe((data) => {
      this.menuItems = data.menuItems;
      this.favorites = data.favorites;
    });
  }

  onShowForm() {
    this.store.dispatch(
      new AppActions.FormEditModeChanged({formEditMode: false}));
    this.modalService.show(FormModalComponent);
  }

}
