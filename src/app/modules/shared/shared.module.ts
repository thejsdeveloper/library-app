import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { ContentEditableDirective } from './directive/content-editable.directive';

@NgModule({
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, ContentEditableDirective],
  declarations: [ContentEditableDirective],
})
export class SharedModule {}
