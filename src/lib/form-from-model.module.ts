import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import * as ModuleComponents from './components'

@NgModule({
  declarations: [
    ModuleComponents.FormViewComponent
  ],
  exports: [
    ModuleComponents.FormViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class FormFromModelModule { }
