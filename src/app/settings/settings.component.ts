import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { NgForm } from '@angular/forms/src/directives';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FavoritesService } from '../favorites.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  menuItems: string[];
  importForm: false;
  settings: Array<Array<any>> = [];
  categoryToDelete: string;
  subscription: Subscription;

  constructor(private favService: FavoritesService,
              public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.menuItems = this.favService.getMenuItems();
    this.settings.push(this.favService.getFavorites());
    this.subscription = this.favService.menuItemsUpdated.subscribe((menuItems) => {
      this.menuItems = menuItems;
    });
  }

  onSubmit(form: NgForm) {
    this.favService.addMenuItem(form.value.addCategory.toLowerCase());
    console.log(this.bsModalRef.content);
    this.bsModalRef.hide();
  }

  onExport() {
    this.settings.push(this.menuItems)
    const settings = new File([JSON.stringify(this.settings)], 'settings.txt', {type: 'text/plain;charset=utf-8'});
    FileSaver.saveAs(settings);
  }

  onImport(importValue: any) {
    console.log(importValue);
  }

  onDelete(category: string) {
    this.favService.deleteMenuItem(category);
  }

}
