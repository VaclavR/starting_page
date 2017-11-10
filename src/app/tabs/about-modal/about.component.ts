import { Component, OnInit, HostListener } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromApp from '../../store/app.reducers';
import * as AppActions from '../../store/app.actions';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  appState: Observable<fromApp.State>;
  darkTheme = true;

  constructor(public bsModalRef: BsModalRef,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.appState = this.store.select('app');
    this.appState.subscribe((data) => {
      this.darkTheme = data.darkTheme;
    });
  }

  onHide() {
    this.bsModalRef.hide();
    this.store.dispatch(
      new AppActions.ActiveModal({show: false, component: 'AboutComponent'}));
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'h' || event.keyCode === 27) {
      this.bsModalRef.hide();
      this.store.dispatch(
        new AppActions.ActiveModal({show: false, component: 'AboutComponent'}));
    }
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.keyCode === 27) {
      this.bsModalRef.hide();
      this.store.dispatch(
        new AppActions.ActiveModal({show: false, component: 'AboutComponent'}));
    }
  }

}
