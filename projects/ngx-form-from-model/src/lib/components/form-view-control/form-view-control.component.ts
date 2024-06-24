import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule, FormArray, FormGroup, AbstractControl } from '@angular/forms'
import { Component, Input } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask'
import { Observable, of } from 'rxjs'

import { FieldDefinition, SelectOption, FormDefinition } from '../../classes'
import { ucfirst } from '../../helpers'
import { StyleService } from '../../services'

@Component({
  selector: 'ffm-form-view-control',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
  ],
  templateUrl: './form-view-control.component.html',
  styleUrl: './form-view-control.component.css'
})
export class FormViewControlComponent {
  @Input() field: FieldDefinition = new FieldDefinition()
  @Input() size: string = ''
  @Input() uistyle: string = 'bootstrap'
  @Input() formGroup: FormGroup = new FormGroup({})
  ucfirst = ucfirst
  private subFormDefinitions: FormDefinition[] = []

  constructor(public styleService:StyleService) {
  }

  source(field: FieldDefinition): Observable<SelectOption[]> {

    if(typeof field.options?.source === 'string' || field.options?.source == undefined)
      return of([])

    if((field.options?.source as any).length) {
      return of(field.options?.source as SelectOption[])
    }

    return field.options?.source as Observable<SelectOption[]>
  }

  getFormArray() {
    return this.formGroup.get(this.field.id) as FormArray
  }

  getFormDefinition(i:number) {
    if(!this.field.options?.formDefinition) {
      return new FormDefinition()
    }
    const formDefinition:FormDefinition = this.subFormDefinitions[i] || this.field.options?.formDefinition()

    this.subFormDefinitions[i] = formDefinition;
    return formDefinition
  }

  getFormGroup(control: AbstractControl) {
    return control as FormGroup
  }

  getComponentInputs() {
    return { field: this.field, formGroup: this.formGroup }
  }

}
