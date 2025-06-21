import {FormArray, FormGroup} from '@angular/forms';

export default class FormUtils {


  static isValidField(myForm: FormGroup, fieldName: string): boolean | null {
    return !!myForm.controls[fieldName].errors && !myForm.controls[fieldName].touched
  }

  static isValidFieldOnArray(formArray: FormArray, index: number) {
    return (formArray.controls[index].touched && formArray.controls[index].errors)
  }

  static getFieldError(myForm: FormGroup, fieldName: string): string | null {

    if (!myForm.controls[fieldName]) {
      return null;
    }
    const errors = myForm.controls[fieldName].errors ?? {};

    for (const key of Object.keys(errors)) {

      switch (key) {
        case 'required':
          return 'Required field';
        case 'minLength':
          return `Minimum field: ${errors[key].requiredLength}`;
        case 'min':
          return `Minimum value: ${errors[key].min}`;
      }

    }
    return null;


  }

  static getFieldErrorOnArray(formArray: FormArray, fieldIndex: number): string | null {

    if (!formArray.controls[fieldIndex]) {
      return null;
    }
    const errors = formArray.controls[fieldIndex].errors ?? {};

    for (const key of Object.keys(errors)) {

      switch (key) {
        case 'required':
          return 'Required field';
        case 'minLength':
          return `Minimum field: ${errors[key].requiredLength}`;
        case 'min':
          return `Minimum value: ${errors[key].min}`;
      }

    }
    return null;


  }


}
