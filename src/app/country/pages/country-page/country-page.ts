import {Component, effect, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {filter, map, of, switchMap, tap} from 'rxjs';
import {CountryItem} from '../../interfaces/Country';
import {Country} from '../../country';

@Component({
  selector: 'app-country-page',
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './country-page.html',
  styleUrl: './country-page.css'
})
export class CountryPage {

  private fb = inject(FormBuilder)

  countryService = inject(Country)

  regions = signal(this.countryService.regions)

  countriesByRegion = signal<CountryItem[]>([])

  bordersOfCountry = signal<CountryItem[]>([])


  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  })

  ofFormChanged = effect((onCleanup) => {

    const regionSubscription = this.formRegionChanged()
    const countrySubscription = this.formCountryChanged()


    onCleanup(() => {
      regionSubscription.unsubscribe()
      countrySubscription.unsubscribe()
    })

  })


  formRegionChanged() {
    return this.myForm.get('region')!.valueChanges.pipe(
      tap(() => {
        this.myForm.get('country')!.setValue(''),
          this.countriesByRegion.set([])
      }),
      switchMap(region => this.countryService.getCountriesByRegion(region!))
      //cambia el valor del observable y ahora habra countries y no region
    )
      .subscribe(value => {
        this.countriesByRegion.set(value)
      })
  }

  formCountryChanged() {
    return this.myForm.get('country')!.valueChanges.pipe(
      tap(() => {
        this.myForm.get('border')!.setValue(''),
          this.bordersOfCountry.set([])
      }),
      filter(value => value!.length > 0),
      switchMap((alphaCode) => {
        return this.countryService.getCountryByAlphaCode(alphaCode!)
      }),
      switchMap((country) => {

          return this.countryService.getCountryBorderByCodes(country.borders)
        }
      )
    )
      .subscribe(value => {

        if (value) {
          this.bordersOfCountry.set(value)
        }

      })
  }


}
