import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MenuItem } from '../../menuItem.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as AppActions from '../../store/app.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  appState: Observable<fromApp.State>;
  darkTheme: boolean;
  categoryToDelete: string;

  constructor(private store: Store<fromApp.AppState>,
              public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.appState = this.store.select('app');
    this.appState.subscribe((data) => {
      this.darkTheme = data.darkTheme;
    });
  }

  onAdd(form: NgForm) {
    this.store.dispatch(new AppActions.AddMenuItem(new MenuItem(form.value.name.toLowerCase())));
    form.reset();
  }

  onDelete(category: string) {
    this.store.dispatch(new AppActions.DeleteMenuItem(new MenuItem(category)));
    this.categoryToDelete = undefined;
  }

  onHide() {
    this.bsModalRef.hide();
    this.store.dispatch(
      new AppActions.ActiveModal({show: false, component: 'CategoriesComponent'}));
  }

}
