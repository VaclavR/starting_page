import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule} from 'ngx-bootstrap/collapse';

import { TabsComponent } from './tabs.component';
import { ImportModalComponent } from './import-modal/import-modal.component';
import { AboutComponent } from './about-modal/about.component';
import { CapitalizePipe } from '../capitalize.pipe';
import { CategoriesComponent } from './categories-modal/categories.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TabsComponent,
    ImportModalComponent,
    AboutComponent,
    CategoriesComponent,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  entryComponents: [
    ImportModalComponent,
    AboutComponent,
    CategoriesComponent
  ],
  exports: [
    TabsComponent,
    ImportModalComponent,
    AboutComponent,
    CategoriesComponent,
    CapitalizePipe
  ]
})

export class TabsModule {}
