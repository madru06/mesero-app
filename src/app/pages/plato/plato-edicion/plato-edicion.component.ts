import { PlatoService } from './../../../_service/plato.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Plato } from 'src/app/_models/plato';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-plato-edicion',
  templateUrl: './plato-edicion.component.html',
  styleUrls: ['./plato-edicion.component.css']
})

export class PlatoEdicionComponent implements OnInit {

  id : string;
  form : FormGroup;
  edicion : boolean;
  file : any;
  labelFile: string;
  urlImagen: string;

  constructor(
    private platoService: PlatoService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private _snackBar: MatSnackBar,
    private afStorage : AngularFireStorage,
    private afs : AngularFirestore
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'id' : new FormControl(''),
      'nombre' : new FormControl(''),
      'precio' : new FormControl(0)
    });

    this.route.params.subscribe((params : Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.initForm();
    });

  }

  initForm(){
    if(this.edicion){
      this.platoService.leer(this.id).subscribe((data : Plato) => {
        this.form = new FormGroup({
          'id' : new FormControl(data.id),
          'nombre' : new FormControl(data.nombre),
          'precio' : new FormControl(data.precio)
        });

        if(data.id != null){
          this.afStorage.ref(`platos/${data.id}`).getDownloadURL().subscribe(data => {
            this.urlImagen = data;
          })
        }
      });
    }
  }

  operar(){
    let mensaje;
    let plato = new Plato();

    if(this.edicion){
      plato.id = this.form.value['id'];
    }else{
      plato.id = this.afs.createId();
    }

    plato.nombre = this.form.value['nombre'];
    plato.precio = this.form.value['precio'];

    if(this.file != null){
      let ref = this.afStorage.ref(`platos/${(plato.id)}`);
      ref.put(this.file);
    }

    if (this.edicion){
      this.platoService.modificar(plato);
      mensaje = 'Se ha modificado el plato';
    } else {
      this.platoService.registrar(plato);
      mensaje = 'Se ha registro un nuevo plato';
    }

    this._snackBar.open(mensaje, 'AVISO', {
      duration: 2000
    });

    this.router.navigate(['plato']);
  }

  seleccionar(e : any){
    this.file = e.target.files[0];
    this.labelFile = e.target.files[0].name;
  }
}
