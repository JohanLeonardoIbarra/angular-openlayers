import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DesktopComponent } from './pages/desktop/desktop.component';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { OpenLayersComponent } from './components/open-layers/open-layers.component';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ModalComponent } from './components/modal/modal.component';
import { MobileMenuComponent } from './pages/mobile-menu/mobile-menu.component';
import { MobileMapComponent } from './pages/mobile-map/mobile-map.component';
import { MobileDetailComponent } from './pages/mobile-detail/mobile-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { MobileComponent } from './pages/mobile/mobile.component';

@NgModule({
  declarations: [
    AppComponent,
    DesktopComponent,
    OpenLayersComponent,
    SidebarComponent,
    ModalComponent,
    MobileMenuComponent,
    MobileMapComponent,
    MobileDetailComponent,
    MobileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
