import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import FormUtils from '../../../utils/form-utils';
import formUtils from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [
    JsonPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPage {

  fb = inject(FormBuilder);

  formUtils = FormUtils;


  myForm: FormGroup = this.fb.group({

      name: [null, [Validators.required, Validators.pattern(formUtils.namePattern)]],
      email: [null, [Validators.required, Validators.pattern(formUtils.emailPattern)],[formUtils.checkingEmail]],
      username: [null, [Validators.required, Validators.minLength(6), Validators.pattern(formUtils.notOnlySpacesPattern),formUtils.checkingUsername]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: [
        formUtils.isFieldOneLikeFieldTwo('password', 'confirmPassword'),
      ]
    }
  )


  onSubmit() {
    this.myForm.markAllAsTouched()
  }


}
