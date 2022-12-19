import { Personne } from 'src/app/model/personne';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-modalmodifuser',
  templateUrl: './modalmodifuser.component.html',
  styleUrls: ['./modalmodifuser.component.scss']
})
export class ModalmodifuserComponent implements OnInit {

  listRole: any[] = ['administrateur', 'utilisateur'];
  listEtat: any[] = ['on', 'off'];
  message: string = "";
  isUtilisateur: boolean = false;

  constructor(
    private authservice : AuthService,
    @Inject(DIALOG_DATA) public data : { user : Personne},
    private DialogRef : DialogRef
  ) { }

  ngOnInit(): void {
    if(this.data.user.role != "administrateur"){
      this.isUtilisateur = true;
    }
  }
  submit(){
    console.log(this.data.user);
    this.authservice.updateUser(this.data.user).subscribe(
      (res:any) => this.message = res.message,
      (err) => console.log(err)      
    )
  }
}
