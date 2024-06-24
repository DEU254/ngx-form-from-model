import { Base as BaseModel } from 'ngx-form-from-model'
import { Validators } from '@angular/forms'

export class User extends BaseModel {
  id: string | null = null
  firstname: string | null = null
  lastname: string | null = null
  email: string | null = null
  role: string | null = null
  groupId: string | null = null

  protected override fields = [
    {
      id: 'id',
      options: {
        type: 'hidden' // or checkbox, text, number, email, password, date
      }
    },
    {
      id: 'firstname',
      options: {
        label: 'Name',
      },
      validators: [Validators.required]
    },
    {
      id: 'lastname',
      options: {
        visible: false
      }
    },
    {
      id: 'email',
      validators: [Validators.required, Validators.email]
    },
    {
      id: 'role',
      options: {
        type: 'select',
        source: [
          {value: 'ADMIN'},
          {value: 'USER'}
        ]
     },
     validators: [Validators.required]
    },
    {
       id: 'groupId',
       options: {
         type: 'select',
         source: 'groups'
       }
    },
  ]
}
