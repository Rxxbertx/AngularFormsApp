import {Routes} from '@angular/router';
import {BasicPage} from './pages/basic-page/basic-page';
import {SwitchesPage} from './pages/switches-page/switches-page';
import {DynamicPage} from './pages/dynamic-page/dynamic-page';

export const reactiveRoutes: Routes = [

  {
    path: '',
    children: [
      {
        path: 'basic',
        component: BasicPage,
        title: 'Basic',
      },
      {
        path: 'dynamic',
        component: DynamicPage,
        title: 'Dynamic',
      },
      {
        path: 'switches',
        component: SwitchesPage,
        title: 'Switches',
      },
      {
        path: "**",
        redirectTo: "basic"
      }
    ]
  }

]
