import { Component, OnDestroy, OnInit } from '@angular/core';
import { Favorite } from '../favorite.model';
import { FavoritesService } from '../favorites.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';
import { AddComponent } from './add/add.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  favorites: Favorite[];
  subscription: Subscription;
  category: string;

  constructor(private favService: FavoritesService,
              private route: ActivatedRoute,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.category = params.id;
      this.favService.returnSortedFavorites(params.id);
      console.log(params.id);
    });
    this.favorites = this.favService.getFavorites(this.category);
    this.subscription = this.favService.favoritesUpdated
      .subscribe((favorites: Favorite[]) => {
        this.favorites = favorites;
      });
  }

  onShowForm() {
    this.favService.editedFavorite = {
      name: '',
      url: '',
      category: this.category
    };
    this.favService.editedIndex = undefined;
    this.modalService.show(AddComponent);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
