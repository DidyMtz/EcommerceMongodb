import { TokenInterceptorService } from './services/token-interceptor.service';
import { ImportExportService } from './services/import-export.service';
import { Dialog,DialogModule } from '@angular/cdk/dialog';
import { AuthService } from './services/auth.service';
import { ProduitService } from './services/produit.service';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { ModalComponent } from './header/search/modal.component';
import { CarouselFooterComponent } from './footer/carousel-footer/carousel-footer.component';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import { ImportComponent } from './operation/produit/import/import.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ExportComponent } from './operation/produit/export/export.component';
import {MatListModule} from '@angular/material/list';
import { CategorieProduitComponent } from './produit/categorie-produit/categorie-produit.component';
import { CarouselsModule } from './carousels/carousels.module';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './auth/register/register.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AdministrationComponent } from './operation/administration/administration.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'; 
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import { ModalmodifproduitComponent } from './operation/produit/modalmodifproduit/modalmodifproduit.component';
import { ModalsupprproduitComponent } from './operation/produit/modalsupprproduit/modalsupprproduit.component';
import { ModalsuppruserComponent } from './operation/user/modalsuppruser/modalsuppruser.component';
import { ModalmodifuserComponent } from './operation/user/modalmodifuser/modalmodifuser.component';

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
    CarouselFooterComponent,
    ImportComponent,
    ExportComponent,
    CategorieProduitComponent,
    ContactComponent,
    RegisterComponent,
    AdministrationComponent,
    ModalmodifproduitComponent,
    ModalsupprproduitComponent,
    ModalsuppruserComponent,
    ModalmodifuserComponent
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
    MatCheckboxModule,
    MatIconModule,
    HttpClientModule,
    MatExpansionModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatListModule,
    CarouselsModule,
    CarouselModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatSnackBarModule
    

  ],
  providers: [ProduitService, AuthService, ImportExportService, Dialog, MatDatepicker,{provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorService,multi:true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
