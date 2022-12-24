import { Dialog } from '@angular/cdk/dialog';
import { AuthService } from '../../services/auth.service';
import { Personne } from '../../model/personne';
import { Produit } from '../../model/produit';
import { ProduitService } from '../../services/produit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../search/modal.component';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  active: any | null = null;
  classe: boolean = false;
  currentRoute: string | null = null;
  islogged: boolean = false;
  isAdmin: boolean = false;
  role: string = "";
  search: Produit[] = [];
  produit: any[] = [];
  message: string | null = null;
  client: Personne = new Personne();
  tel: string = "Commander par Téléphone";
  logo : string = "./../../../assets/img/LogoMakr-5umAFL.png";

  LoginForm!: FormGroup;

  constructor(
    private activatedroute: ActivatedRoute,
    private authservice: AuthService,
    public dialog: Dialog,
    private route: Router, private formBuild: FormBuilder,
    private produitservice: ProduitService) {

  }

  ngOnInit(): void {

    this.initForm();
    this.login();
    this.getProduit();
  }



  //permet de recueillir stat sur appel par tel
  changeMessage() {

    this.tel = " Contact : 0661192405";

  }

  //recuperer la liste des produits
  getProduit() {
    this.produitservice.getProduit().subscribe(
      (res: any) => {
        this.produit = res;
        this.produit.forEach(p => {
          if (!p.photo.includes('assets')) {
            p.photo = '/assets/img/upload/' + p.photo;
          }

        });
      },
      (err) => console.log(err)

    )
  }
  goTo(destination: string) {

    this.route.navigate([destination]);
  }

  //recherche affiche un modal
  openModal(item: string) {

    if (!item) return;

    this.search = this.produit.filter(i => (i.name.toLowerCase()).includes(item.toLowerCase()));

    const modalRef = this.dialog.open(ModalComponent, {
      panelClass: 'my-dialog',
      data: { produit: this.search }
    });

  }

  //initiliser le reactive formulaire
  initForm() {

    this.LoginForm = new FormGroup(
      {
        email: new FormControl(),
        password: new FormControl()
      }
    );

    this.LoginForm = this.formBuild.group(
      {
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      }
    );
  }

  //se logguer
  login() {
    this.message = "";

    const client = this.LoginForm.value;

    if (!this.LoginForm.valid) return;
    this.authservice.loginUser(client).subscribe(
      (res: any) => {
        this.role = res.role;
        this.message = res.message;
        this.islogged = true;
        sessionStorage.setItem("token", res.token);
        localStorage.setItem("email", client.email);

        //verifier le role
        if (this.role === "administrateur" && res.token) {
          this.isAdmin = true;
        } else { this.isAdmin = false; }
      },
      (err) => {

        if (err instanceof HttpErrorResponse) {

          if (err.status === 400) {
            this.message = "Désolé problème email ou mot de passe"
          } else this.message = err.message;
        }
      }
    )


  }

  //se delogguer
  logout() {
    sessionStorage.removeItem("email");
    sessionStorage.clear();
    this.islogged = false;
    this.route.navigate(["/"]);
  }


  //forcer le refresh de la page /fonction non utilisée
  reloadPage() {

    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.navigate(['/produit'], {
      relativeTo: this.activatedroute,
      queryParamsHandling: "merge"
    });
  }









}
