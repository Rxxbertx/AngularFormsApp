import {Component} from '@angular/core';
import {reactiveRoutes} from '../../../reactive/reactive.routes';
import {RouterLink, RouterLinkActive} from '@angular/router';
import authRoutes from '../../../auth/auth.routes';
import {countryRoutes} from '../../../country/country.routes';

@Component({
  selector: 'app-side-menu',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css'
})
export class SideMenu {

  reactiveMenuItems: MenuItem[] = reactiveItems
    .filter((e) => (e.path != '**'))
    .map((item) => ({
      route: `reactive/${item.path}`,
      title: `${item.title}`,
    }))

  authMenuItems: MenuItem[] = [
    {
      route:'./auth',
      title: 'Register',
    }
  ]
  countryMenuItems: MenuItem[] = [
    {
      route:'./country',
      title: 'Countries',
    }
  ]

}


interface MenuItem {
  title: string;
  route: string;
}

const reactiveItems = reactiveRoutes[0].children ?? []

