import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Favorite } from '../../favorite.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as AppActions from '../../store/app.actions';
import * as fromApp from '../../store/app.reducers';
const title = require('url-title');

@Component({
  selector: 'app-form-modal',
  templateUrl: './favorite-form-modal.component.html',
  styleUrls: ['./favorite-form-modal.component.css']
})
export class FormModalComponent implements OnInit {
  favoriteForm: FormGroup;
  editedFavorite: Favorite;
  editMode = false;
  appState: Observable<fromApp.State>;
  darkTheme: boolean;

  constructor(private store: Store<fromApp.AppState>,
              public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.appState = this.store.select('app');
    this.appState.subscribe((data) => {
      this.editMode = data.favoriteEditMode;
      this.editedFavorite = data.editedFavorite;
      this.darkTheme = data.darkTheme;
      this.favoriteForm = new FormGroup({
        'url': new FormControl(this.editedFavorite.url, [Validators.required]),
        'name': new FormControl(this.editedFavorite.name, [Validators.required]),
        'category': new FormControl(this.editedFavorite.category)
      });
      this.favoriteForm.get('url').valueChanges.subscribe(() => {
        if (this.favoriteForm.get('url').valid) {
          this.favoriteForm.get('name').setValue(title(this.favoriteForm.get('url').value));
        }
      });
    });
  }

  onSubmit() {

    for (const item in this.favoriteForm.value) {
      if (this.favoriteForm.value.hasOwnProperty(item)) {
        this.favoriteForm.value[item] = this.favoriteForm.value[item].toLowerCase();
      }
    }

    if (this.editMode === false) {
      this.store.dispatch(new AppActions.AddFavorite(this.favoriteForm.value));
    } else {
      this.store.dispatch(new AppActions
        .SaveEditedFavorite({
          originalFavorite: this.editedFavorite,
          newFavorite: this.favoriteForm.value}));
    }

    this.bsModalRef.hide();
    this.store.dispatch(
      new AppActions.ActiveModal({show: false, component: 'FavoriteFormModalComponent'}));
  }

  onHide() {
    this.bsModalRef.hide();
    this.store.dispatch(new AppActions.ActiveModal({show: false, component: 'FavoriteFormModalComponent'}));
  }
}
