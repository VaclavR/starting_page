import { AboutComponent } from './about/about.component';
import { ImportModalComponent } from './import-modal/import-modal.component';
import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CategoriesComponent } from '../categories/categories.component';
import { MenuItem } from '../menuItem.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
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
  favorites: Favorite[] = [];
  menuItems: MenuItem[] = [];
  settings: Array<Array<any>>;

  public isCollapsed = true;
  editMode = false;

  constructor(private modalService: BsModalService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.appState = this.store.select('app');
    this.appState.subscribe((data) => {
      this.favorites = data.favorites;
      this.menuItems = data.menuItems;
    });
  }

  onEditMode() {
    this.editMode = !this.editMode;
    this.store.dispatch(new AppActions.EditModeChanged(this.editMode));
  }

  onCategories() {
    this.modalService.show(CategoriesComponent);
  }

  onExport() {
    this.store.dispatch(new AppActions.ExportSettings());
  }

  onImport() {
    this.modalService.show(ImportModalComponent);
  }

  onAbout() {
    this.modalService.show(AboutComponent);
  }

}
