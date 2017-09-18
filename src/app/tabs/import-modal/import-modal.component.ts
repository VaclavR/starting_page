import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs/Subject';
import { Favorite } from '../../favorite.model';
import { Subscription } from 'rxjs/Subscription';
import { FavoritesService } from '../../favorites.service';
import { MenuItem } from '../../menuItem.model';


@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['./import-modal.component.css']
})
export class ImportModalComponent implements OnInit, OnDestroy {

  importedSettings: [Favorite[], MenuItem[]];
  settingsLoaded = new Subject<void>();
  settingSubscription: Subscription;


  constructor(private favService: FavoritesService,
              public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.settingSubscription = this.settingsLoaded.subscribe(() => {
      this.favService.proccessImportedSettings(this.importedSettings);
    });
  }

  onImport(event) {
    const reader = new FileReader();
    reader.onload = () => {
      const check = () => {
        try {
          JSON.parse(reader.result)[0][0].name = 'test';
          for (let i = 1; i < JSON.parse(reader.result)[0].length; i++) {
            JSON.parse(reader.result)[0][i].name = 'test';
            JSON.parse(reader.result)[0][i].url = 'test';
            JSON.parse(reader.result)[0][i].category = 'test';
          }
          JSON.parse(reader.result)[1][0].name = 'test';
          for (let i = 1; i < JSON.parse(reader.result)[1].length; i++) {
            JSON.parse(reader.result)[1][i].name = 'test';
          }

        } catch (e) {
            return false;
        }
        return true;
      };
      if (!check()) {
        alert('This is not a Settings file!!!');
        return;
      }
        this.importedSettings = JSON.parse(reader.result);
        this.settingsLoaded.next();
        this.bsModalRef.hide();
    };
    reader.readAsText(event.target.files[0]);
  }

  ngOnDestroy() {
    this.settingSubscription.unsubscribe();
  }
}
