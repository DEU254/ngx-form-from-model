import { FormGroup, FormControl } from '@angular/forms'

import {
  FormDefinition,
  FieldDefinition,
} from '../../classes'

export class Base {
  protected formDefinitions: Partial<FormDefinition>[] = []
  protected fields: FieldDefinition[] = []
  protected asyncValidators:any[] = []

  static formDefinition(formDef = 'default'): FormDefinition {
    const instance = new this()
    let formDefinitions = instance['formDefinitions']
    const fields = instance['fields']
    const asyncValidators = instance['asyncValidators']

    for (const attribute in instance) {
      if(['formDefinitions', 'fields', 'asyncValidators'].indexOf(attribute) != -1)
        continue
      const fieldDefinition = fields.find((v) => v.id === attribute)
      if(!fieldDefinition) {
        fields.push({ id: attribute, options: {}, validators: [] })
      }
    }

    const visibleFields = fields.filter((f => f.options?.visible != undefined ? f.options?.visible : true))

    if (formDefinitions.length > 0) {
      formDefinitions = formDefinitions.map((fd:Partial<FormDefinition>) => {
        if(fd.formGroup)
          return fd

        const formGroup: FormGroup = new FormGroup({});
        let fdFields: FieldDefinition[] = []
        visibleFields
          .forEach((f) => {
            let fieldCopy = Object.assign({}, f)
            const overridenField: FieldDefinition | undefined = fd.fields?.find((fd:FieldDefinition) => fd.id == f.id)
            if(overridenField) {
              fieldCopy = Object.assign({}, f, overridenField)
            }
            formGroup.addControl(
              fieldCopy.id,
              new FormControl('', { validators: fieldCopy.validators })
            );
            fdFields.push(fieldCopy)
          })

        fd.fields = fdFields
        fd.formGroup = formGroup

        return fd
      })
    }

    const defaultFd: Partial<FormDefinition> | undefined = formDefinitions.find((fd) => fd.id === 'default')
    if(defaultFd == undefined) {
      const formGroup: FormGroup = new FormGroup({});

      visibleFields
        .forEach((f) => {
          formGroup.addControl(
            f.id,
            new FormControl('', { validators: f.validators })
          );
        })
      formGroup.setAsyncValidators(asyncValidators)
      formDefinitions.push({ id: 'default', fields: visibleFields, formGroup })
    }

    const fd: Partial<FormDefinition> | undefined = formDefinitions.find((fd) => fd.id === formDef);
    if (fd == undefined) {
      throw `No FormDefinition found for formDef: ${formDef}`
    }

    return FormDefinition.fromObject(fd as FormDefinition);
  }
}
