import {AbstractControl, FormArray, FormGroup, ValidationErrors} from '@angular/forms';

async function sleep() {
  return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000)

    }
  )
}

export default class FormUtils {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static isValidField(myForm: FormGroup, fieldName: string): boolean | null {
    return !(myForm.controls[fieldName].errors && myForm.controls[fieldName].touched)
  }

  static isValidFieldOnArray(formArray: FormArray, index: number) {
    return (formArray.controls[index].touched && formArray.controls[index].errors)
  }

  static isFieldOneLikeFieldTwo(field: string, field2: string) {

    return (formGroup: AbstractControl) => {

      const field1Value = formGroup.get(field)?.value;
      const field2Value = formGroup.get(field2)?.value;

      if (field1Value === field2Value) {
        return null;
      }
      return {
        fieldNotEquals: true
      }

    }

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
        case 'minlength':
          return `Minimum field: ${errors[key].requiredLength}`;
        case 'min':
          return `Minimum value: ${errors[key].min}`;
        case 'email':
          return `The email is not correct`;
        case 'emailTaken':
          return `The email is already taken, try another`;
          case 'usernameTaken':
          return `The username is already taken, try another`;
        case 'pattern':
          return `The value doesnt match pattern`;
        default:
          return `Invalid field ${key}: ${errors[key]}`;
      }

    }
    return null;


  }

  static  checkingUsername(control: AbstractControl): ValidationErrors | null {


    const value = control.value;

    if (value === 'strider') {
      return {
        usernameTaken: true
      }
    }

    return null;

  }

  static async checkingEmail(control: AbstractControl): Promise<ValidationErrors | null> {

    await sleep();

    const value = control.value;

    if (value === 'hola@mundo.com') {
      return {
        emailTaken: true
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
