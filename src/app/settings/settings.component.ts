import { Favorite } from '../favorite.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs/Rx';
import { NgForm } from '@angular/forms/src/directives';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FavoritesService } from '../favorites.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  menuItems: string[];
  settings: Array<Array<any>> = [];
  categoryToDelete: string;
  subscription: Subscription;
  settingSubscription: Subscription;
  importedSettings: [Favorite[], string[]];
  settingsLoaded = new Subject<void>();

  constructor(private favService: FavoritesService,
              public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.settingSubscription = this.settingsLoaded.subscribe(() => {
      this.favService.proccessImportedSettings(this.importedSettings);
    });
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
    this.settings.push(this.menuItems);
    const settings = new File([JSON.stringify(this.settings)], 'settings.json', {type: 'text/plain;charset=utf-8'});
    FileSaver.saveAs(settings);
  }

  onImport(event) {
    const reader = new FileReader();
    reader.onload = () => {
        const text = JSON.parse(reader.result);
        this.importedSettings = text;
        this.settingsLoaded.next();
    };
    reader.readAsText(event.target.files[0]);
  }

  onDelete(category: string) {
    this.favService.deleteMenuItem(category);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.settingSubscription.unsubscribe();
  }

}
