import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { MenuItem } from '../menuItem.model';
import { Store } from '@ngrx/store';
import * as AppActions from '../store/app.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  appState: Observable<{menuItems: MenuItem[]}>;
  categoryToDelete: string;

  constructor(private store: Store<{app: {menuItems: MenuItem[]}}>,
              public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.appState = this.store.select('app');
  }

  onAdd(form: NgForm) {
    this.store.dispatch(new AppActions.AddMenuItem(new MenuItem(form.value.name.toLowerCase())));
    form.reset();
  }

  onDelete(category: string) {
    this.store.dispatch(new AppActions.DeleteMenuItem(new MenuItem(category)));
    this.categoryToDelete = undefined;
  }

}
