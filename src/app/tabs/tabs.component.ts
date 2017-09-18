import { AboutComponent } from './about/about.component';
import { ImportModalComponent } from './import-modal/import-modal.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FavoritesService } from '../favorites.service';
import { Subscription } from 'rxjs/Subscription';
import { CategoriesComponent } from '../categories/categories.component';
import * as FileSaver from 'file-saver';
import { MenuItem } from '../menuItem.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})

export class TabsComponent implements OnInit, OnDestroy {

  menuItems: MenuItem[];
  subscription: Subscription;
  settings: Array<Array<any>>;

  public isCollapsed = true;
  editMode = false;

  constructor(private favService: FavoritesService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.menuItems = this.favService.getMenuItems();
    this.subscription = this.favService.menuItemsUpdated
      .subscribe((menuItems: MenuItem[]) => {
        this.menuItems = menuItems;
      });
  }

  public collapsed(event: any): void {
    // console.log(event);
  }

  public expanded(event: any): void {
    // console.log(event);
  }

  onEditMode() {
    this.editMode = !this.editMode;
    this.favService.itemEditMode = this.editMode;
    this.favService.itemEditModeChanged.next();
  }

  onCategories() {
    this.modalService.show(CategoriesComponent);
  }

  onExport() {
    this.settings = [];
    this.settings.push(this.favService.getFavorites());
    this.settings.push(this.menuItems);
    const settings = new File([JSON.stringify(this.settings)], 'settings.json', {type: 'text/plain;charset=utf-8'});
    FileSaver.saveAs(settings);
  }

  onImport() {
    this.modalService.show(ImportModalComponent);
  }

  onAbout() {
    this.modalService.show(AboutComponent);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



}
