import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Favorite } from '../../favorite.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as AppActions from '../../store/app.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {
  editedFavorite: Favorite;
  editMode = false;
  appState: Observable<fromApp.State>;

  constructor(private store: Store<fromApp.AppState>,
              public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.appState = this.store.select('app');
    this.appState.subscribe((data) => {
      this.editMode = data.formEditMode;
      this.editedFavorite = data.editedFavorite;
    });
  }

  onSubmit(form: NgForm) {
    this.bsModalRef.hide();
    for (const item in form.value) {
      if (form.value.hasOwnProperty(item)) {
        form.value[item] = form.value[item].toLowerCase();
      }
    }

    if (this.editMode === false) {
      this.store.dispatch(new AppActions.AddFavorite(form.value));
    } else {
      this.store.dispatch(new AppActions
        .SaveEditedFavorite({originalFavorite: this.editedFavorite, newFavorite: form.value}));
    }
  }
}
