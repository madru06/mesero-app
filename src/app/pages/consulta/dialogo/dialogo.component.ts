import { Consumo } from './../../../_models/consumo';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {

  consumo : Consumo;

  constructor(
    private dialogRef : MatDialogRef<DialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data : Consumo
  ) { }

  ngOnInit() {
    this.consumo = this.data;
  }

  cerrar(){
    this.dialogRef.close();
  }
}
