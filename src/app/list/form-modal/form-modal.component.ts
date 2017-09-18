import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FavoritesService } from '../../favorites.service';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Favorite } from '../../favorite.model';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css']
})
export class FormModalComponent implements OnInit {
  editedFavorite: Favorite;

  constructor(public favService: FavoritesService,
              public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.editedFavorite = this.favService.editedFavorite;
  }

  onSubmit(form: NgForm) {
    this.bsModalRef.hide();
    for (const item in form.value) {
      if (form.value.hasOwnProperty(item)) {
        form.value[item] = form.value[item].toLowerCase();
      }
    }

    if (this.favService.formEditMode === false) {
      this.favService.addFavorite(form.value);
    } else {
      this.favService.saveEditedFavorite(this.editedFavorite, form.value);
    }
  }
}
