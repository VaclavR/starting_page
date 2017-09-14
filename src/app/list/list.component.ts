import { Component, OnDestroy, OnInit } from '@angular/core';
import { Favorite } from '../favorite.model';
import { FavoritesService } from '../favorites.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap';
import { FormModalComponent } from './form-modal/form-modal.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {

  favorites: Favorite[];
  subscription: Subscription;

  constructor(private favService: FavoritesService,
              private route: ActivatedRoute,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.favService.activeRoute = params.id;
      this.favService.returnSortedFavorites(params.id);
    });
    this.favorites = this.favService.getFavorites();
    this.subscription = this.favService.favoritesUpdated
      .subscribe((favorites: Favorite[]) => {
        this.favorites = favorites;
      });
  }

  onShowForm() {
    this.favService.editedFavorite = {
      name: '',
      url: '',
      category: this.favService.activeRoute
    };
    this.favService.editMode = false;
    this.modalService.show(FormModalComponent);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
