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
import { EditCategoryComponent } from './category-form-modal/category-form-modal.component';

@NgModule({
  declarations: [
    TabsComponent,
    ImportModalComponent,
    AboutComponent,
    CategoriesComponent,
    EditCategoryComponent,
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
    CategoriesComponent,
    EditCategoryComponent
  ],
  exports: [
    TabsComponent,
    ImportModalComponent,
    AboutComponent,
    CategoriesComponent,
    EditCategoryComponent,
    CapitalizePipe
  ]
})

export class TabsModule {}
