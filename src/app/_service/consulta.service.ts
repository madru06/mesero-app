import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class ConsultaService {


  constructor(private afs : AngularFirestore) { }
  listar( fecha : Date){
    let inicio = moment(fecha).toISOString();
    let fin = moment(inicio).add(1, 'days').toISOString();

    console.log(inicio);
    console.log(fin);

    return this.afs.collection('consumos', ref => ref.where('fechaPedido', '>=', new Date(inicio))
    .where('fechaPedido', '<', new Date(fin))).snapshotChanges();
  }}

