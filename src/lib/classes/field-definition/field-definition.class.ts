import { ValidatorFn } from '@angular/forms'
import { Observable } from 'rxjs'

export interface SelectOption {
  value:string
  label?:string
}

export interface FieldOptions {
  type?: string
  label?: string
  source?: SelectOption[] | string | Observable<SelectOption[]>
  visible?: boolean
}

export class FieldDefinition {
  id: string = ''
  options?: FieldOptions = {}
  validators?: ValidatorFn[] = []
}
