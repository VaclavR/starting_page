import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { StoreModule } from '@ngrx/store';
import { TabsModule } from './tabs/tabs.module';
import { ListModule } from './list/list.module';

import { AppComponent } from './app.component';
import { SortFavoritesComponent } from './sort-favorites/sort-favorites.component';
import { appReducer } from './store/app.reducers';

@NgModule({
  declarations: [
    AppComponent,
    SortFavoritesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TabsModule,
    ListModule,
    StoreModule.forRoot({app: appReducer}),
    ModalModule.forRoot(),
    SortableModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
