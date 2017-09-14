import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Favorite } from '../../favorite.model';
import { FavoritesService } from '../../favorites.service';
import { BsModalService } from 'ngx-bootstrap';
import { FormModalComponent } from '../form-modal/form-modal.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() favorite: Favorite;
  @Input() index: number;

  constructor(private favService: FavoritesService,
              private route: ActivatedRoute,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.favService.activeRoute = params.id;
    });
  }

  onDelete() {
    this.favService.deleteFavorite(this.favorite);
  }

  onShowForm() {
    this.favService.editMode = true;
    this.favService.editedFavorite = this.favorite;
    this.modalService.show(FormModalComponent);
  }

}
