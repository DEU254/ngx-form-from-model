import { Component } from '@angular/core';
import { FormDefinition, FormViewComponent } from 'ngx-form-from-model'

import { User } from '@src/app/models'

@Component({
  selector: 'app-bootstrap',
  standalone: true,
  imports: [FormViewComponent],
  templateUrl: './bootstrap.component.html',
  styleUrl: './bootstrap.component.scss'
})
export class BootstrapComponent {
  formDefinition: FormDefinition = User.formDefinition()

  ngOnInit(): void {
    this.formDefinition.withSources({
      'groups': [] // any observable that returns an array of { value, label } objects
    })
  }

  save() {
    // use this.formDefinition.formGroup.value
  }
}
