import { Consumo } from './../_models/consumo';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { switchMap, first } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor( private afs : AngularFirestore) { }

  //consumos por fecha
  buscarPorFecha(fecha : Date){
    let inicio = moment(fecha).toISOString();
    let fin = moment(inicio).add(1, 'days').toISOString();

    return this.afs.collection('consumos', ref => ref
      .where('fechaPedido', '>=', new Date(inicio))
      .where('fechaPedido', '<', new Date(fin))) 
      .valueChanges(); 
  }

  buscarPorCliente(){
    return this.afs.collection<Consumo>('consumos', ref => ref.where('cliente.nombreCompleto', '==', 'Norman')).valueChanges();
  }

  //buscar por id, a modo relacional
  buscarClientePorConsumo(){
    return this.afs.collection<Consumo>('consumos', ref => ref
    .where('cliente.nombreCompleto', '==', 'Norman')).valueChanges()
    .pipe(switchMap((data : any) => {
      console.log(data);
      let idCliente = data[1].cliente.id
      return this.afs.collection('clientes').doc(idCliente).valueChanges();
    }));
  }
  //forkjoin, para consultas tipo OR
  buscarConsumosClienteIden(){
    let obs1 = this.afs.collection('clientes', ref => ref.where('dui', '==', '0000000000000000000')).valueChanges().pipe(first());
    let obs2 = this.afs.collection('clientes', ref => ref.where('dui', '>', '0000000000000000000')).valueChanges().pipe(first());
    
    return forkJoin(obs1, obs2);
  }
}
