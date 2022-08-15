import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProduitComponent } from './operation/produit/produit.component';
import { UserComponent } from './operation/user/user.component';
import { AfficheProduitComponent } from './affiche-produit/affiche-produit.component';
import { DetailsProduitComponent } from './details-produit/details-produit.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    ProduitComponent,
    UserComponent,
    AfficheProduitComponent,
    DetailsProduitComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
