import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import FormUtils from '../../../utils/form-utils';
import formUtils from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './switches-page.html',
  styleUrl: './switches-page.css'
})
export class SwitchesPage {

  fb = inject(FormBuilder);
  fromUtils = FormUtils


  myForm: FormGroup = this.fb.group({

    gender: ['', Validators.required],
    checkNotifications: [false, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],

  })

  onSaveForm() {

    this.myForm.markAllAsTouched()

  }

  protected readonly formUtils = formUtils;
}
