import { Plato } from './../../../_models/plato';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PlatoService } from 'src/app/_service/plato.service';
@Component({
  selector: 'app-plato-modal',
  templateUrl: './plato-modal.component.html',
  styleUrls: ['./plato-modal.component.css']
})
export class PlatoModalComponent implements OnInit {

  plato : Plato;
  edicion : boolean;

  constructor(public dialogRef: MatDialogRef<PlatoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Plato, private platoService: PlatoService) { }

  ngOnInit() {
    this.plato = new Plato();
    this.plato.id = this.data.id;
    this.plato.nombre = this.data.nombre;
    this.plato.precio = this.data.precio;
  }

  cancelar(){
    this.dialogRef.close();
  }

  operar(){
    let mensaje;
    let plato = new Plato();
    this.plato.id = this.data.id;
    this.plato.nombre = this.data.nombre;
    this.plato.precio = this.data.precio;

    if (this.edicion){
      this.platoService.modificar(plato);
      mensaje = 'Se ha modificado el plato';
    } else {
      this.platoService.registrar(plato);
      mensaje = 'Se ha registro un nuevo plato';
    }

  }
}
