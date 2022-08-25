
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitComponent } from './operation/produit/produit.component';
import { UserComponent } from './operation/user/user.component';
import { AfficheProduitComponent } from './affiche-produit/affiche-produit.component';
import { DetailsProduitComponent } from './details-produit/details-produit.component';
import { ErrorComponent } from './error/error.component';
import { PanierComponent } from './panier/panier.component';
import { CarouselComponent } from './carousel/carousel.component';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { LoginComponent } from './auth/login/login.component';
import { CarouselFooterComponent } from './carousel-footer/carousel-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ProduitComponent,
    UserComponent,
    AfficheProduitComponent,
    DetailsProduitComponent,
    ErrorComponent,
    PanierComponent,
    CarouselComponent,
    NavComponent,
    FooterComponent,
    ModalComponent,
    LoginComponent,
    CarouselFooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbCarouselModule,
    ReactiveFormsModule,
    MdbModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
