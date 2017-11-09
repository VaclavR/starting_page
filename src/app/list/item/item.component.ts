import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Favorite } from '../../favorite.model';
import { BsModalService } from 'ngx-bootstrap';
import { FormModalComponent } from '../favorite-form-modal/favorite-form-modal.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as AppActions from '../../store/app.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() favorite: Favorite;
  @Input() index: number;
  editMode: boolean;
  darkTheme: boolean;
  target: string;
  appState: Observable<fromApp.State>;
  config = {
    keyboard: false,
    ignoreBackdropClick: true
  };

  constructor(private route: ActivatedRoute,
              private modalService: BsModalService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.appState = this.store.select('app');
    this.appState.subscribe((data) => {
      this.editMode = data.itemEditMode;
      this.darkTheme = data.darkTheme;
      this.target = data.target;
    });
  }

  onDelete() {
    this.store.dispatch(new AppActions.DeleteFavorite(this.favorite));
  }

  onShowForm() {
    this.store.dispatch(
      new AppActions.ActiveModal({show: true, component: 'FormModalComponent'}));
    this.store.dispatch(
      new AppActions.FavoriteEditModeChanged({favoriteEditMode: true, editedFavorite: this.favorite}));
    this.modalService.show(FormModalComponent, this.config);
  }

}
