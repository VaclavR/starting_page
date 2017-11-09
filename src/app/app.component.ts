import { Component, HostListener, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { Store } from '@ngrx/store';
import { NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AboutComponent } from './tabs/about-modal/about.component';
import * as fromApp from './store/app.reducers';
import * as AppActions from './store/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  editMode = false;
  route: string;
  beforeRoute: string;
  appState: Observable<fromApp.State>;
  activeModal: {show: boolean, component?: string};
  config = {
    keyboard: false,
    ignoreBackdropClick: true
  };

  constructor(private store: Store<fromApp.AppState>,
              private router: Router,
              private modalService: BsModalService) {}

  ngOnInit() {
    this.appState = this.store.select('app');
    this.appState.subscribe((data) => {
      this.activeModal = data.activeModal;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.route = event.url.substr(1);
        this.store.dispatch(new AppActions.ActiveRoute(this.route));
      }
    });
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'h':
        if (this.activeModal.show !== true) {
          this.store.dispatch(
            new AppActions.ActiveModal({show: true, component: 'AboutComponent'}));
          this.modalService.show(AboutComponent, this.config);
        }
        break;

      case 'n':
        this.store.dispatch(new AppActions.ToggleTarget());
        break;

      case 'e':
        if (!this.activeModal.show) {
          this.editMode = !this.editMode;
          this.store.dispatch(new AppActions.EditModeChanged(this.editMode));
        }
        break;

      case 's':
        if (this.route !== 'sort' && !this.activeModal.show) {
          this.beforeRoute = this.route;
          this.store.dispatch(new AppActions.ActiveRoute('sort'));
          this.router.navigate(['/sort']);
        } else if (this.route === 'sort' && this.beforeRoute !== undefined) {
          this.store.dispatch(new AppActions.ActiveRoute(this.beforeRoute));
          this.router.navigate([this.beforeRoute]);
        } else if (!this.activeModal.show){
          this.store.dispatch(new AppActions.ActiveRoute('all'));
          this.router.navigate(['all']);
        }
        break;
    }
  }
}
