import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './list/item/item.component';
import { FormModalComponent } from './list/form-modal/form-modal.component';
import { CategoriesComponent } from './categories/categories.component';
import { SortFavoritesComponent } from './sort-favorites/sort-favorites.component';
import { appReducer } from './store/app.reducers';
import { TabsModule } from './tabs/tabs.module';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ItemComponent,
    FormModalComponent,
    CategoriesComponent,
    SortFavoritesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    TabsModule,
    StoreModule.forRoot({app: appReducer}),
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    SortableModule.forRoot()
  ],
  entryComponents: [
    FormModalComponent,
    CategoriesComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
