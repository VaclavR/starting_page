import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Favorite } from '../../favorite.model';
import { BsModalService } from 'ngx-bootstrap';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as AppActions from '../../store/app.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() favorite: Favorite;
  @Input() index: number;
  editMode: boolean;
  darkTheme: boolean;
  appState: Observable<fromApp.State>;

  constructor(private route: ActivatedRoute,
              private modalService: BsModalService,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.store.dispatch(new AppActions.ActiveRoute(params.id))
    });
    this.appState = this.store.select('app');
    this.appState.subscribe((data) => {
      this.editMode = data.itemEditMode;
      this.darkTheme = data.darkTheme;
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
