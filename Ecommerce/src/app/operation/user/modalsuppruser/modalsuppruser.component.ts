import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Personne } from 'src/app/model/personne';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modalsuppruser',
  templateUrl: './modalsuppruser.component.html',
  styleUrls: ['./modalsuppruser.component.scss']
})
export class ModalsuppruserComponent implements OnInit {

  message: string = "";
  constructor(
    private authservice: AuthService,
    @Inject(DIALOG_DATA) public data: { user: Personne },
    private dialogRef: DialogRef) { }

  ngOnInit(): void {
  }

  supprimer() {
    const id = this.data.user._id;
    this.authservice.deleteUser(id).subscribe(
      (res: any) => {
        this.message = res.message;
      },
      (err) => console.log(err)
    )
  }

}
