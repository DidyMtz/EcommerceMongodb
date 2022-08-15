import { DetailsProduitComponent } from './details-produit/details-produit.component';
import { AfficheProduitComponent } from './affiche-produit/affiche-produit.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path:'produit', component:AfficheProduitComponent},
{ path:'details-produit/:id', component:DetailsProduitComponent},
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
