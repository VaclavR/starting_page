import { Injectable } from '@angular/core';
import { Favorite } from './favorite.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FavoritesService {

  private favorites: Favorite[] = [];
  private menuItems: string[] = [];
  activeRoute: string;

  favoritesUpdated = new Subject<Favorite[]>();
  menuItemsUpdated = new Subject<string[]>();

  editedFavorite: Favorite = {
    name: '',
    url: '',
    category: ''
  };
  formEditMode = false;
  itemEditMode = new Subject<boolean>();

  constructor() {}

  getFavorites() {
    if (localStorage.favorites) {
      this.favorites = JSON.parse(localStorage.getItem('favorites'));
    }
    if (this.activeRoute !== undefined) {
      if (this.activeRoute === 'all') {
        return this.favorites.slice();
      }
      return this.favorites.filter((favorites) => {
        return favorites.category === this.activeRoute;
      });
    } else {
      return this.favorites.slice();
    }
  }

  addMenuItem(menuItem: string) {
    this.menuItems.push(menuItem);
    localStorage.setItem('menuItems', JSON.stringify(this.menuItems.slice()));
    this.menuItemsUpdated.next(this.menuItems.slice());
  }

  getMenuItems() {
    if (localStorage.menuItems) {
      this.menuItems = JSON.parse(localStorage.getItem('menuItems'));
    }
    return this.menuItems.slice();
  }

  deleteMenuItem(category: string) {
    const index = this.menuItems.findIndex((menuItem: string) => {
      return menuItem === category;
    });
    this.menuItems.splice(index, 1);
    localStorage.setItem('menuItems', JSON.stringify(this.menuItems.slice()));
    this.menuItemsUpdated.next(this.menuItems.slice());
  }

  returnSortedFavorites(category: string) {
    if (category === 'all') {
     return this.favoritesUpdated.next(this.favorites.slice());
    }

    const sortedFavorites = this.favorites.filter((favorites) => {
      return favorites.category === category;
    });
    this.favoritesUpdated.next(sortedFavorites);
  }

  deleteFavorite(favorite: Favorite) {
    const index = this.favorites.findIndex((fav) => {
      return fav === favorite;
    });
    this.favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(this.favorites.slice()));
    this.returnSortedFavorites(this.activeRoute);
  }

  addFavorite(favorite: Favorite) {
    this.favorites.push(favorite);
    localStorage.setItem('favorites', JSON.stringify(this.favorites.slice()));
    this.returnSortedFavorites(this.activeRoute);
  }

  saveEditedFavorite(originalFavorite: Favorite, favorite: Favorite) {
    const index = this.favorites.findIndex((fav) => {
      return fav === originalFavorite;
    });
    this.favorites[index] = favorite;
    localStorage.setItem('favorites', JSON.stringify(this.favorites.slice()));
    this.returnSortedFavorites(this.activeRoute);
  }

  proccessImportedSettings(settings: [Favorite[], string[]]) {
    this.favorites = settings[0];
    localStorage.setItem('favorites', JSON.stringify(this.favorites.slice()));
    this.returnSortedFavorites(this.activeRoute);
    this.menuItems = settings[1];
    localStorage.setItem('menuItems', JSON.stringify(this.menuItems.slice()));
    this.menuItemsUpdated.next(this.menuItems.slice());
  }

}
