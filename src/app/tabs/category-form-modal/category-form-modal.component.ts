import { Component, HostListener, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { MenuItem } from '../../menuItem.model';
import * as fromApp from '../../store/app.reducers';
import * as AppActions from '../../store/app.actions';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: 'category-form-modal.component.html',
  styleUrls: ['category-form-modal.component.css']
})
export class EditCategoryComponent implements OnInit {
  appState: Observable<fromApp.State>;
  darkTheme: boolean;
  editMode: boolean;
  editedMenuItem: MenuItem;

  constructor(public bsModalRef: BsModalRef,
              private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.appState = this.store.select('app');
    this.appState.subscribe((data) => {
      this.darkTheme = data.darkTheme;
      this.editedMenuItem = data.editedMenuItem;
      this.editMode = data.menuItemEditMode;
    });
  }

  onSave(form: NgForm) {
    this.bsModalRef.hide();
    this.store.dispatch(
      new AppActions.ActiveModal({show: false, component: 'CategoryFormModalComponent'}));
    if (this.editMode) {
      this.store.dispatch(new AppActions.
      SaveEditedMenuItem({
        originalMenuItem: this.editedMenuItem,
        newMenuItem: new MenuItem(form.value.name.toLowerCase())
      }));
    } else {
      this.store.dispatch(new AppActions.
      AddMenuItem(new MenuItem(form.value.name.toLowerCase())));
    }
    form.reset();
  }

  onHide() {
    this.bsModalRef.hide();
    this.store.dispatch(
      new AppActions.ActiveModal({show: false, component: 'CategoryFormModalComponent'}));
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.onHide();
    }
  }

}
