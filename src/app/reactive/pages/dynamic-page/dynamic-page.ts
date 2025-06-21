import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import formUtils from '../../../utils/form-utils';

@Component({
  selector: 'app-dynamic-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './dynamic-page.html',
  styleUrl: './dynamic-page.css'
})
export class DynamicPage {

  private fb = inject(FormBuilder);

  newFavorite = new FormControl('', Validators.required);


  myForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      favoriteGames: this.fb.array([['Meta Gear', Validators.required], ['Nfs Gear', Validators.required]], Validators.minLength(3))
    }
  )

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray
  }


  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched()
      return;
    }
    this.myForm.reset();

  }

    formUtils = formUtils;

  addToFavorites() {

    if (this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    this.favoriteGames.push(this.fb.control(newGame, Validators.required));

    this.newFavorite.reset()


  }

  deleteFavorite(i: number) {
    this.favoriteGames.removeAt(i)
  }
}
