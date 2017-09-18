import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs/Rx';
import { NgForm } from '@angular/forms/src/directives';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FavoritesService } from '../favorites.service';
import { MenuItem } from '../menuItem.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  menuItems: MenuItem[];
  categoryToDelete: string;
  categoriesSubscription: Subscription;

  constructor(private favService: FavoritesService,
              public bsModalRef: BsModalRef) { }

  ngOnInit() {

    this.menuItems = this.favService.getMenuItems();
    this.categoriesSubscription = this.favService.menuItemsUpdated.subscribe((menuItems) => {
      this.menuItems = menuItems;
    });
  }

  onAdd(form: NgForm) {
    this.favService.addMenuItem(form.value.name.toLowerCase());
    form.reset();
    // console.log(this.bsModalRef.content);
  }

  onDelete(category: string) {
    this.favService.deleteMenuItem(category);
    this.categoryToDelete = undefined;
  }

  ngOnDestroy() {
    this.categoriesSubscription.unsubscribe();
  }

}
