import { Detalle } from './../_models/detalle';
import { Cliente } from './../_models/cliente';
import { Consumo } from './../_models/consumo';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsumoService {

  constructor( private afs : AngularFirestore) { }

  registrar(consumo : Consumo){
    return this.afs.collection('consumos').add({
      cliente : Object.assign({}, consumo.cliente),
      detalle : JSON.parse(JSON.stringify(consumo.detalle)),
      fechaPedido : consumo.fechaPedido,
      total : consumo.total
    });
  }

  registrarTransaccion(consumo:Consumo, cliente?:Cliente){
    const batch = this.afs.firestore.batch();
    if(cliente != null || cliente != undefined){
      const idGeneradoCliente = this.afs.createId();
      const docCliente = this.afs.collection('clientes').doc(idGeneradoCliente);
      batch.set(docCliente.ref,{
        dui : cliente.dui,
        nombreCompleto : cliente.nombreCompleto
      });
      consumo.cliente.id = idGeneradoCliente;

      const idGeneradoConsumo = this.afs.createId();
      const docConsumo = this.afs.collection('consumos').doc(idGeneradoConsumo);
      batch.set(docConsumo.ref, {
        cliente : {
          id : consumo.cliente.id,
          nombreCompleto : consumo.cliente.nombreCompleto,
          dui : consumo.cliente.dui
        },
        fechaPedido : consumo.fechaPedido,
        total : consumo.total,
        detalle : JSON.parse(JSON.stringify(consumo.detalle))
      });

      return batch.commit();

    }
  }
}
