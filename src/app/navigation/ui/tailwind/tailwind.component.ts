import { Component } from '@angular/core';
import { FormDefinition, FormViewComponent } from 'ngx-form-from-model'

import { User } from '@src/app/models'

@Component({
  selector: 'app-tailwind',
  standalone: true,
  imports: [FormViewComponent],
  templateUrl: './tailwind.component.html',
  styleUrl: './tailwind.component.scss'
})
export class TailwindComponent {
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
