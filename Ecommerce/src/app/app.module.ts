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
import { AfficheProduitComponent } from './produit/affiche-produit/affiche-produit.component';
import { DetailsProduitComponent } from './produit/details-produit/details-produit.component';
import { ErrorComponent } from './error/error.component';
import { PanierComponent } from './produit/panier/panier.component';
import { CarouselComponent } from './header/carousel/carousel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './header/nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './header/modal/modal.component';
import { LoginComponent } from './auth/login/login.component';
import { CarouselFooterComponent } from './footer/carousel-footer/carousel-footer.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';

 

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
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DialogModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatStepperModule,
    MatCheckboxModule
  ],
  providers: [ProduitService, AuthService,Dialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
