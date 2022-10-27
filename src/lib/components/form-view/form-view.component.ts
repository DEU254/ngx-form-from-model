import { Component, OnInit, Input } from '@angular/core'
import { Observable, of } from 'rxjs'

import { FormDefinition, FieldDefinition, SelectOption } from '../../classes'
import { ucfirst } from '../../helpers'

@Component({
  selector: 'ffm-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css']
})
export class FormViewComponent implements OnInit {

  @Input() formDefinition: FormDefinition = new FormDefinition()
  @Input() size: string = ''
  ucfirst = ucfirst

  constructor() { }

  ngOnInit(): void {}

  onSubmit() {}

  source(field: FieldDefinition): Observable<SelectOption[]> {

    if(typeof field.options?.source === 'string' || field.options?.source == undefined)
      return of([])

    if((field.options?.source as any).length) {
      return of(field.options?.source as SelectOption[])
    }

    return field.options?.source as Observable<SelectOption[]>
  }

}
