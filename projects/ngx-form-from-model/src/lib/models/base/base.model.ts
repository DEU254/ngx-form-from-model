import { FormGroup, FormControl, FormArray } from '@angular/forms'

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
            const overridenField: FieldDefinition | undefined = fd.fields?.find((fid:FieldDefinition) => fid.id == f.id)
            if(overridenField) {
              fieldCopy = Object.assign({}, f, overridenField)
            }
            if(fieldCopy.options?.visible === false) {
              return
            }
            Base.addFieldIntoGroup(formGroup, fieldCopy);
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
          Base.addFieldIntoGroup(formGroup, f);
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

  private static addFieldIntoGroup(formGroup: FormGroup, f: FieldDefinition) {
    switch(f.options?.type) {
    case 'object':
        const formDefinitionFunc = f.options?.formDefinition
        const formDefinition:FormDefinition = formDefinitionFunc ? formDefinitionFunc() : new FormDefinition()
        if(f.options?.fill) {
          const patchValue = f.options?.fill
          formDefinition.formGroup.patchValue(patchValue)

          for(let attr in patchValue) {
            formDefinition.formGroup.get(attr)?.disable()
          }
        }
        formGroup.addControl(f.id, formDefinition.formGroup as never);
        break;
      case 'array':
        const formArray = new FormArray([])
        if(f.options?.fill) {
          f.options?.fill.forEach((patchValue:any, index:number) => {
            const formDefinitionFunc = f.options?.formDefinition
            const formDefinition:FormDefinition = formDefinitionFunc ? formDefinitionFunc() : new FormDefinition()
            formDefinition.formGroup.patchValue(patchValue)

            for(let attr in patchValue) {
              formDefinition.formGroup.get(attr)?.disable()
            }

            formArray.insert(index, formDefinition.formGroup as never)
          })
        }
        formGroup.addControl(f.id, formArray);
        break;
      default:
        formGroup.addControl(
          f.id,
          new FormControl('', { validators: f.validators })
        );
        break;
    }
  }
}
