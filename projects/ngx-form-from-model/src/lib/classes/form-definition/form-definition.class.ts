import { FormGroup } from '@angular/forms';

import { FieldDefinition } from '../'

export class FormDefinition {
  id: string = '';
  fields: FieldDefinition[] = []
  formGroup:FormGroup = new FormGroup({});

  withSources(sources: any) {
    this.fields = this.fields.map((fd: FieldDefinition) => {
      if(
        fd.options?.type == 'select' &&
        typeof fd.options?.source === 'string' &&
        sources[fd.options?.source] != undefined
      ) {
        fd.options.source = sources[fd.options?.source]
      }

      return fd
    })
    return this
  }

  static fromObject(object:FormDefinition) {
    const instance:FormDefinition = new FormDefinition()
    instance.id = object.id
    instance.fields = object.fields
    instance.formGroup = object.formGroup

    return instance
  }
}
