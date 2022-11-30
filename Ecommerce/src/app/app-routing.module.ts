import { AuthGuard } from './services/auth.guard';
import { ContactComponent } from './contact/contact.component';
import { CategorieProduitComponent } from './produit/categorie-produit/categorie-produit.component';
import { UserComponent } from './operation/user/user.component';
import { ProduitComponent } from './operation/produit/produit.component';
import { PanierComponent } from './produit/panier/panier.component';
import { ErrorComponent } from './error/error.component';
import { DetailsProduitComponent } from './produit/details-produit/details-produit.component';
import { AfficheProduitComponent } from './produit/affiche-produit/affiche-produit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
{ path:'produit', component:AfficheProduitComponent},
{ path:'details-produit/:id1', component:DetailsProduitComponent},
{ path:'panier', component:PanierComponent},
{ path:'categorie/:link', component: CategorieProduitComponent},
{ path:'op_produit', component:ProduitComponent,canActivate:[AuthGuard]},
{ path:'op_user', component:UserComponent, canActivate:[AuthGuard]},
{ path:'contact', component:ContactComponent},
{ path: '', redirectTo: 'produit', pathMatch: 'full' },
{ path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation:'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
