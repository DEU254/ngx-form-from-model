import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxMaskModule, IConfig } from 'ngx-mask'

import * as ModuleComponents from './components'

export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null

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
    NgxMaskModule.forRoot(),
  ]
})
export class FormFromModelModule { }
