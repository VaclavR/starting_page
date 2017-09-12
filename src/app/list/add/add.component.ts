import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FavoritesService } from '../../favorites.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Favorite } from '../../favorite.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  editedFavorite: Favorite;
  editedIndex: number;

  constructor(private favService: FavoritesService,
              public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.editedIndex = this.favService.editedIndex;
    this.editedFavorite = this.favService.editedFavorite;
  }

  onSubmit(form: NgForm) {
    this.bsModalRef.hide();
    for (const item in form.value) {
      if (form.value.hasOwnProperty(item)) {
        form.value[item] = form.value[item].toLowerCase();
      }
    }

    if (this.favService.editedIndex === undefined) {
      this.favService.addFavorite(form.value);
    } else {
      this.favService.saveEditedFavorite(this.editedIndex, form.value);
    }
  }
}

