import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { FormDefinition } from '../../classes'
import { FormViewControlComponent } from '../form-view-control/form-view-control.component'

@Component({
  selector: 'ffm-form-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormViewControlComponent
  ],
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent {

  @Input() formDefinition: FormDefinition = new FormDefinition()
  @Input() size: string = ''
  @Input() uistyle: string = 'bootstrap'

  constructor() { }

  onSubmit() {}

}
