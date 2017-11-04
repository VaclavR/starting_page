import { AboutComponent } from './about-modal/about.component';
import { ImportModalComponent } from './import-modal/import-modal.component';
import { Component, ElementRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CategoriesComponent } from './categories-modal/categories.component';
import { MenuItem } from '../menuItem.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Favorite } from '../favorite.model';
import * as AppActions from '../store/app.actions';
import * as fromApp from '../store/app.reducers';
import { Router } from '@angular/router';

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

  public isCollapsed = true;
  editMode = false;

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
      if (this.darkTheme) {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'black';
      } else {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
      }
    });
  }

  onEditMode() {
    this.editMode = !this.editMode;
    this.store.dispatch(new AppActions.EditModeChanged(this.editMode));
  }

  onCategories() {
    this.modalService.show(CategoriesComponent);
  }

  onSort() {
    this.router.navigate(['/sort']);
  }

  onExport() {
    this.store.dispatch(new AppActions.ExportSettings());
  }

  onImport() {
    this.modalService.show(ImportModalComponent);
  }

  onToggleTheme() {
    this.store.dispatch(new AppActions.ChangeTheme());
  }

  onAbout() {
    this.modalService.show(AboutComponent);
  }

}
