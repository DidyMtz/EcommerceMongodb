import { Dialog,DialogModule } from '@angular/cdk/dialog';
import { AuthService } from './services/auth.service';
import { ProduitService } from './services/produit.service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitComponent } from './operation/produit/produit.component';
import { UserComponent } from './operation/user/user.component';
import { AfficheProduitComponent } from './affiche-produit/affiche-produit.component';
import { DetailsProduitComponent } from './details-produit/details-produit.component';
import { ErrorComponent } from './error/error.component';
import { PanierComponent } from './panier/panier.component';
import { CarouselComponent } from './carousel/carousel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from './auth/login/login.component';
import { CarouselFooterComponent } from './carousel-footer/carousel-footer.component';
import { ModalAlertComponent } from './modal-alert/modal-alert.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';

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
    CarouselFooterComponent,
    ModalAlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DialogModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCardModule
    
  ],
  providers: [ProduitService, AuthService,Dialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
