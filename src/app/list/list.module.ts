import { NgModule } from '@angular/core';
import { ListComponent } from './list.component';
import { ItemComponent } from './item/item.component';
import { FormModalComponent } from './favorite-form-modal/favorite-form-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,
    ItemComponent,
    FormModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ListComponent,
    ItemComponent,
    FormModalComponent
  ],
  entryComponents: [
    FormModalComponent
  ]
})
export class ListModule {}
