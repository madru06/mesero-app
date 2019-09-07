import { Plato } from '../_models/plato';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  constructor(private afs : AngularFirestore) { }

  listar(){
    //return this.afs.collection<Plato>('platos').snapshotChanges();
    return this.afs.collection<Plato>('platos').valueChanges();
  }
  
  registrar(plato : Plato){
    
    return this.afs.collection('platos').doc(plato.id).set({
      id : plato.id,
      nombre : plato.nombre,
      precio : plato.precio
    });
  }

  modificar(plato : Plato){
    return this.afs.collection('platos').doc(plato.id).set(Object.assign({}, plato));
  }

  leer(documentId : string){
    return this.afs.collection<Plato>('platos').doc(documentId).valueChanges();
  }

  eliminar(plato: Plato){
    return this.afs.collection('platos').doc(plato.id).delete();
  }
}
