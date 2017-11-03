import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule} from 'ngx-bootstrap/collapse';

import { TabsComponent } from './tabs.component';
import { ImportModalComponent } from './import-modal/import-modal.component';
import { AboutComponent } from './about/about.component';
import { CapitalizePipe } from '../capitalize.pipe';

@NgModule({
  declarations: [
    TabsComponent,
    ImportModalComponent,
    AboutComponent,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  entryComponents: [
    ImportModalComponent,
    AboutComponent
  ],
  exports: [
    TabsComponent,
    ImportModalComponent,
    AboutComponent,
    CapitalizePipe
  ]
})

export class TabsModule {}
