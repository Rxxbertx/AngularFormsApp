import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, Observable, of} from 'rxjs';
import {CountryItem} from './interfaces/Country';

@Injectable({
  providedIn: 'root'
})
export class Country {

  private baseUrl: string = 'https://restcountries.com/v3.1'
  private httpClient = inject(HttpClient);

  private _regions = [
    'Africa', 'Oceania', 'Americas', 'Europe', 'Asia'
  ]

  get regions() {
    return [...this._regions]; //copia de arreglo
  }

  getCountriesByRegion(region: string): Observable<CountryItem[]> {

    if (!region) {
      return of([])
    }

    const url = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`;
    return this.httpClient.get<CountryItem[]>(url)

  }

  getCountryByAlphaCode(alpha: string): Observable<CountryItem> {
    if (!alpha) {
      return of()
    }
    const url = `${this.baseUrl}/alpha/${alpha}?fields=cca3,name,borders`;
    return this.httpClient.get<CountryItem>(url)
  }

  getCountryBorderByCodes(countryCodes: string[]): Observable<CountryItem[]> {
    if (!countryCodes) {
      return of([])
    }
    const countriesRequests: Observable<CountryItem>[] = []

    countryCodes.forEach((countryCode) => {
      const request = this.getCountryByAlphaCode(countryCode);
      countriesRequests.push(request)
    })

    return combineLatest(countriesRequests);



  }


}
