import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.scss']
})
export class ModalAlertComponent implements OnInit {

  title: string = "";
  constructor(public modalRef2: MdbModalRef<ModalAlertComponent>) { }

  ngOnInit(): void {
  }

}
