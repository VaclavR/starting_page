import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SortableModule } from 'ngx-bootstrap/sortable';

import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './list/item/item.component';
import { FormModalComponent } from './list/form-modal/form-modal.component';
import { CategoriesComponent } from './categories/categories.component';
import { FavoritesService } from './favorites.service';
import { CapitalizePipe } from './capitalize.pipe';
import { ImportModalComponent } from './tabs/import-modal/import-modal.component';
import { AboutComponent } from './tabs/about/about.component';
import { SortFavoritesComponent } from './sort-favorites/sort-favorites.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    ListComponent,
    ItemComponent,
    FormModalComponent,
    CategoriesComponent,
    CapitalizePipe,
    ImportModalComponent,
    AboutComponent,
    SortFavoritesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    PopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    SortableModule.forRoot()
  ],
  entryComponents: [
    FormModalComponent,
    CategoriesComponent,
    ImportModalComponent,
    AboutComponent
  ],
  providers: [FavoritesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
