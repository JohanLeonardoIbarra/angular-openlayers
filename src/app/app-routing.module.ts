import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesktopComponent } from './pages/desktop/desktop.component';
import { MobileMenuComponent } from './pages/mobile-menu/mobile-menu.component';
import { MobileMapComponent } from './pages/mobile-map/mobile-map.component';
import { MobileDetailComponent } from './pages/mobile-detail/mobile-detail.component';
import { MobileComponent } from './pages/mobile/mobile.component';

const routes: Routes = [
  { 
    path: 'desktop', 
    component: DesktopComponent,
    pathMatch: 'full'
  },
  {
    path: 'mobile',
    pathMatch: 'prefix',
    component: MobileComponent,
    children: [
      {
        path: 'menu',
        component: MobileMenuComponent,
        pathMatch: 'full'
      },
      {
        path: 'map',
        component: MobileMapComponent,
        pathMatch: 'full'
      },
      {
        path: 'detail/:id',
        component: MobileDetailComponent,
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'menu'
      }
    ]
  },
  { 
    path: '**', 
    redirectTo: 'desktop',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }