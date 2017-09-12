import { Component, Input } from '@angular/core';
import { Favorite } from '../../favorite.model';
import { FavoritesService } from '../../favorites.service';
import { BsModalService } from 'ngx-bootstrap';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() favorite: Favorite;
  @Input() index: number;

  constructor(private favService: FavoritesService,
              private modalService: BsModalService) { }

  onDelete() {
    this.favService.deleteFavorite(this.favorite);
  }

  onShowForm() {
    this.favService.editedIndex = this.index;
    this.favService.editedFavorite = this.favorite;
    this.modalService.show(AddComponent);
  }

}
