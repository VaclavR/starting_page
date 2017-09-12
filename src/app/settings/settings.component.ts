import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { NgForm } from '@angular/forms/src/directives';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  menuItems: string[];
  subscription: Subscription;

  constructor(private favService: FavoritesService,
              public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.menuItems = this.favService.getMenuItems();
    this.subscription = this.favService.menuItemsUpdated.subscribe((menuItems) => {
      this.menuItems = menuItems;
    });
  }

  onSubmit(form: NgForm) {
    this.favService.addMenuItem(form.value.category.toLowerCase());
    console.log(this.bsModalRef.content);
    this.bsModalRef.hide();
  }

  onDelete(index: number) {
    this.favService.deleteMenuItem(index);
  }

}
