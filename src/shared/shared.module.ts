import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { COMPONENTS } from './components';

@NgModule({
  imports: [ CommonModule ],
  exports : [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    COMPONENTS
  ],
  declarations: COMPONENTS,
})
export class SharedModule { }
