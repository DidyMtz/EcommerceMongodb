import { UserComponent } from './operation/user/user.component';
import { ProduitComponent } from './operation/produit/produit.component';
import { PanierComponent } from './panier/panier.component';
import { ErrorComponent } from './error/error.component';
import { DetailsProduitComponent } from './details-produit/details-produit.component';
import { AfficheProduitComponent } from './affiche-produit/affiche-produit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
{ path:'produit', component:AfficheProduitComponent},
{ path:'details-produit/:id1', component:DetailsProduitComponent},
{ path:'panier', component:PanierComponent},
{ path:'op_produit', component:ProduitComponent},
{ path:'op_user', component:UserComponent},
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
