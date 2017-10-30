import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Favorite } from '../../favorite.model';
import { BsModalService } from 'ngx-bootstrap';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { Store } from '@ngrx/store';
import * as AppActions from '../../store/app.actions';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() favorite: Favorite;
  @Input() index: number;
  editMode: boolean;
  appState: Observable<{favorites: Favorite[], itemEditMode: boolean}>;

  constructor(private route: ActivatedRoute,
              private modalService: BsModalService,
              private store: Store<{app: {favorites: Favorite[], itemEditMode: boolean}}>) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.store.dispatch(new AppActions.ActiveRoute(params.id))
    });
    this.appState = this.store.select('app');
    this.appState.subscribe((data) => {
      this.editMode = data.itemEditMode;
    });
  }

  onDelete() {
    this.store.dispatch(new AppActions.DeleteFavorite(this.favorite));
  }

  onShowForm() {
    this.store.dispatch(
      new AppActions.FormEditModeChanged({formEditMode: true, editedFavorite: this.favorite}));
    this.modalService.show(FormModalComponent);
  }

}
