import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AboutComponent } from './about-modal/about.component';
import { ImportModalComponent } from './import-modal/import-modal.component';
import { EditCategoryComponent } from './category-form-modal/category-form-modal.component';
import { MenuItem } from '../menuItem.model';
import { Favorite } from '../favorite.model';
import * as AppActions from '../store/app.actions';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})

export class TabsComponent implements OnInit {

  appState: Observable<fromApp.State>;
  darkTheme = true;
  favorites: Favorite[] = [];
  menuItems: MenuItem[] = [];
  settings: Array<Array<any>>;
  editMode = false;
  newTabLink: boolean;
  config = {
    keyboard: false,
    ignoreBackdropClick: true
  };
  public isCollapsed = true;

  constructor(private modalService: BsModalService,
              private store: Store<fromApp.AppState>,
              private router: Router,
              private elementRef: ElementRef) { }

  ngOnInit() {
    this.appState = this.store.select('app');
    this.appState.subscribe((data) => {
      this.favorites = data.favorites;
      this.menuItems = data.menuItems;
      this.darkTheme = data.darkTheme;
      this.editMode = data.itemEditMode;
      this.newTabLink = data.target === '_self';
      if (this.darkTheme) {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';
      } else {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
      }
    });
  }

  onCheckIfCollapsed() {
    if (!this.isCollapsed) {
      this.isCollapsed = !this.isCollapsed;
    }
  }

  onEditMode() {
    this.editMode = !this.editMode;
    this.store.dispatch(new AppActions.EditModeChanged(this.editMode));
  }

  onSort() {
    this.store.dispatch(new AppActions.ActiveRoute('sort'));
    this.router.navigate(['/sort']);
  }

  onExport() {
    this.store.dispatch(new AppActions.ExportSettings());
  }

  onImport() {
    this.store.dispatch(
      new AppActions.ActiveModal({show: true, component: 'ImportModalComponent'}));
    this.modalService.show(ImportModalComponent, this.config);
  }

  onToggleTheme() {
    this.store.dispatch(new AppActions.ChangeTheme());
  }

  onToggleTarget() {
    this.store.dispatch(new AppActions.ToggleTarget());
  }

  onAbout() {
    this.store.dispatch(
      new AppActions.ActiveModal({show: true, component: 'AboutComponent'}));
    this.modalService.show(AboutComponent, this.config);
  }

  onShowMenuItemAddForm() {
    this.store.dispatch(
      new AppActions.ActiveModal({show: true, component: 'EditCategoryComponent'}));
    this.store.dispatch(
      new AppActions.MenuItemEditModeChanged({menuItemEditMode: false}));
    this.modalService.show(EditCategoryComponent, this.config);
  }

  onDeleteMenuItem(category: string) {
    this.store.dispatch(new AppActions.DeleteMenuItem(new MenuItem(category)));
  }

  onShowMenuItemEditForm(menuItem: MenuItem) {
    this.store.dispatch(
      new AppActions.ActiveModal({show: true, component: 'EditCategoryComponent'}));
    this.store.dispatch(
      new AppActions.MenuItemEditModeChanged({menuItemEditMode: true, editedMenuItem: menuItem}));
    this.modalService.show(EditCategoryComponent, this.config);
  }

}
