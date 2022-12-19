import { ModalmodifuserComponent } from './modalmodifuser/modalmodifuser.component';
import { ModalsuppruserComponent } from './modalsuppruser/modalsuppruser.component';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Personne } from './../../model/personne';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})








export class UserComponent implements OnInit {

  display: boolean = false;
  addform!: FormGroup;
  listRole: any[] = ['administrateur', 'utilisateur'];
  listEtat: any[] = ['on', 'off'];
  message: string = "";
  displayedColumns: string[] = ['name', 'email', 'role', 'datecreation', 'action'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable;

  constructor(private authservice: AuthService, private dialog: Dialog) { }

  ngOnInit(): void {
    this.initForm();
    this.getAllUser();
  }
  initForm() {
    this.addform = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      tel: new FormControl("", Validators.required),
      etat: new FormControl("off", Validators.required),
      adresse: new FormControl("", Validators.required),
      ville: new FormControl("", Validators.required),
      codepostal: new FormControl("", Validators.required),
      reference: new FormControl(""),
      role: new FormControl("", Validators.required)
    })
  }

  displayAddUserForm() {
    this.display = true;
  }
  hideAddUserForm() {
    this.display = false;
  }

  submit() {
    console.log(this.addform.value);
    if (this.addform.valid)
      this.authservice.registerUser(this.addform.value).subscribe(
        (res: any) => this.message = res.message,
        (err) => console.log(err)
      )
      
  }
  /*
  ouvre modal pour update user
  */
  update(p: Personne) {
    const modalref = this.dialog.open(ModalmodifuserComponent, {
      panelClass: "My-dialog",
      data: { user: p }
    })
  }

  /*
  ouvre modal pour supprimer user
  */
  delete(p: Personne) {
    const modalref = this.dialog.open(ModalsuppruserComponent, {
      panelClass: "My-dialog",
      data: { user: p }
    })

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  /*
  recupere tous les users
  */
  getAllUser() {
    this.authservice.getUser().subscribe((user: any) => {
      this.dataSource = user;
      this.dataSource = new MatTableDataSource<Personne>(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
