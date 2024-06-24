import { ValidatorFn } from '@angular/forms'
import { Observable } from 'rxjs'

import { FormDefinition } from '../form-definition/form-definition.class'

export interface MaskedOption {
  thousandSeparator?:string
  mask?:string
}

export interface SelectOption {
  value:string
  label?:string
}

export interface FieldOptions {
  type?: string
  label?: string
  source?: SelectOption[] | string | Observable<SelectOption[]>
  visible?: boolean
  masked?: MaskedOption
  fill?: any[]
  formDefinition?: (id?:string) => FormDefinition
  component?: any
  custom?: any
}

export class FieldDefinition {
  id: string = ''
  options?: FieldOptions = {}
  validators?: ValidatorFn[] = []
}
