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
{ path: '', redirectTo: 'produit', pathMatch: 'full' },
{ path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
