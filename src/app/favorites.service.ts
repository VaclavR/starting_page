import { Injectable } from '@angular/core';
import { Favorite } from './favorite.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FavoritesService {

  private favorites: Favorite[] = [];
  private menuItems: string[] = [];

  favoritesUpdated = new Subject<Favorite[]>();
  menuItemsUpdated = new Subject<string[]>();

  editedFavorite: Favorite = {
    name: '',
    url: '',
    category: ''
  };
  editedIndex: number;

  constructor() {}

  getFavorites(category?: string) {
    if (localStorage.favorites) {
      this.favorites = JSON.parse(localStorage.getItem('favorites'));
    }
    if (category) {
      if (category === 'all') {
        return this.favorites.slice();
      }
      console.log('category - ' + category);
      const sortedFavorites = this.favorites.filter((favorites) => {
        return favorites.category === category;
      });
      return sortedFavorites;
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

  deleteMenuItem(index: number) {
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
    this.favoritesUpdated.next(this.favorites.slice());
  }

  addFavorite(favorite: Favorite) {
    // const pos = this.menuItems.findIndex((menuItem) => {
    //   return menuItem === favorite.category;
    // });
    // if (pos === -1) {
    //   this.menuItems.push(favorite.category);
    //   localStorage.setItem('menuItems', JSON.stringify(this.menuItems.slice()));
    //   this.menuItemsUpdated.next(this.menuItems.slice());
    // }
    this.favorites.push(favorite);
    localStorage.setItem('favorites', JSON.stringify(this.favorites.slice()));
    this.returnSortedFavorites(favorite.category);
  }

  saveEditedFavorite(index: number, favorite: Favorite) {
    // const pos = this.menuItems.findIndex((menuItem) => {
    //   return menuItem === favorite.category;
    // });
    // if (pos === -1) {
    //   this.menuItems.push(favorite.category);
    //   localStorage.setItem('menuItems', JSON.stringify(this.menuItems.slice()));
    //   this.menuItemsUpdated.next(this.menuItems.slice());
    // }
    this.favorites[index] = favorite;
    localStorage.setItem('favorites', JSON.stringify(this.favorites.slice()));
    this.returnSortedFavorites(favorite.category);
  }

}
