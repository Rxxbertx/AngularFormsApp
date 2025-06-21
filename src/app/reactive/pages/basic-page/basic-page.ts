import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import FormUtils from '../../../utils/form-utils';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-basic-page',
  imports: [
    ReactiveFormsModule, JsonPipe
  ],
  templateUrl: './basic-page.html',
  styleUrl: './basic-page.css'
})
export class BasicPage {


  formUtils = FormUtils

  formBuilder: FormBuilder = inject(FormBuilder)

  myForm: FormGroup = this.formBuilder.group({

    name: ['',/** 2 arg es validador síncrono y el 3 arg es asíncrono*/[Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],

  })

  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return;
    }
    this.myForm.reset();

  }


  //manera tediosa
  /*  myForm = new FormGroup({
      name: new FormControl(''),
      price: new FormControl(0),
      inStorage: new FormControl(0),
    })*/


}
