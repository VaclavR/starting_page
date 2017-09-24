import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';
import { Favorite } from '../favorite.model';
import { MenuItem } from '../menuItem.model';

@Component({
  selector: 'app-sort-favorites',
  templateUrl: './sort-favorites.component.html',
  styleUrls: ['./sort-favorites.component.css']
})
export class SortFavoritesComponent implements OnInit {

  categories: MenuItem[];
  favorites: Favorite[] = [];
  info = false;

  constructor(private favService: FavoritesService,
              private router: Router) { }

  ngOnInit() {
    this.categories = this.favService.getMenuItems();
    this.favorites = this.favService.getFavorites('all');
  }

  saveSorted(favorites: Favorite[]) {
    this.info = true;
    const showInfo = setTimeout(() => this.info = false,
      500);
    this.favService.saveSortedFavorites(favorites);
    // this.router.navigate(['/']);
  }

}
