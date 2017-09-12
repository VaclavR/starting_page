import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './list/item/item.component';
import { AddComponent } from './list/add/add.component';
import { FavoritesService } from './favorites.service';
import { CapitalizePipe } from './capitalize.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    ListComponent,
    ItemComponent,
    AddComponent,
    SettingsComponent,
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot()
  ],
  entryComponents: [
    AddComponent,
    SettingsComponent
  ],
  providers: [FavoritesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
