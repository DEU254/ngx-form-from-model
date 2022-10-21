
# ngx-form-from-model

This library generates an Angular FormGroup definition from a Model Class.

### Install

    npm i ngx-form-from-model

then import module

    import { FormFromModelModule } from 'ngx-form-from-model'

    @NgModule({
      imports: [
        FormFromModelModule
      ],
      bootstrap: [AppComponent]
    })

### Usage

user.model.ts

    import { Base as BaseModel } from 'ngx-form-from-model'
    import { Validators } from '@angular/forms'

    class User extends BaseModel {
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

edit.component.ts

    import { FormDefinition } from 'ngx-form-from-model'
    import { User } from '../models'

    export class Component implements OnInit {

      formDefinition: FormDefinition = User.formDefinition()

      ngOnInit(): void {
        this.formDefinition.withSources({
          'groups': // any observable that returns an array of { value, label } objects
        })
      }

      save() {
        // use this.formDefinition.formGroup.value
      }
    }

edit.component.html

    <ffm-form-view [formDefinition]="formDefinition"></ffm-form-view>
    <button [disabled]="formDefinition.formGroup.invalid" (click)="save()">Save</button>
