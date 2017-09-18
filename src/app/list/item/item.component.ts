import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Favorite } from '../../favorite.model';
import { FavoritesService } from '../../favorites.service';
import { BsModalService } from 'ngx-bootstrap';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {
  @Input() favorite: Favorite;
  @Input() index: number;
  editMode: boolean;
  subcription: Subscription;

  constructor(private favService: FavoritesService,
              private route: ActivatedRoute,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.favService.activeRoute = params.id;
    });
    this.editMode = this.favService.itemEditMode;
    this.subcription = this.favService.itemEditModeChanged.subscribe(() => {
      this.editMode = this.favService.itemEditMode;
    });
  }

  onDelete() {
    this.favService.deleteFavorite(this.favorite);
  }

  onShowForm() {
    this.favService.formEditMode = true;
    this.favService.editedFavorite = this.favorite;
    this.modalService.show(FormModalComponent);
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

}
