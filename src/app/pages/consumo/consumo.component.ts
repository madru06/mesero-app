import { ConsumoService } from './../../_service/consumo.service';
import { Consumo } from './../../_models/consumo';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Detalle } from './../../_models/detalle';
import { Plato } from './../../_models/plato';
import { Cliente } from './../../_models/cliente';
import { PlatoService } from './../../_service/plato.service';
import { ClienteService } from './../../_service/cliente.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-consumo',
  templateUrl: './consumo.component.html',
  styleUrls: ['./consumo.component.css']
})
export class ConsumoComponent implements OnInit {

  form : FormGroup;
  ctrlCliente : FormControl = new FormControl();
  ctrlPlato : FormControl = new FormControl();

  clientesFiltrados : Observable<any[]>;
  platosFiltrados : Observable<any[]>;

  cantidad : number;
  detalle : Detalle[] = [];

  clientes : Cliente[] = [];
  cliente : Cliente;
  platos : Plato[] = [];
  plato : Plato;
  
  dataSource : MatTableDataSource<Detalle>;
  displayedColumns: ['nombre', 'precio', 'cantidad', 'subtotal', 'acciones'];
  total : number = 0;
  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;
  @ViewChild(MatSort, {static : true}) sort : MatSort;

  constructor(
    private builder : FormBuilder,
    private clienteService : ClienteService,
    private platoService : PlatoService,
    private consumoService : ConsumoService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      'cliente' : this.ctrlCliente,
      'plato' : this.ctrlPlato,
      'fecha' : new FormControl(new Date()),
      'cantidad' : new FormControl(0)
    });
    this.listarClientes();
    this.listarPlatos();

    this.clientesFiltrados = this.ctrlCliente.valueChanges.pipe(map(val => this.filtrarClientes(val)))
    this.platosFiltrados = this.ctrlPlato.valueChanges.pipe(map(val => this.filtrarPlatos(val)))

  }

  listarClientes(){
     this.clienteService.listar().subscribe(data => {
      this.clientes = data;
      });
  }

  listarPlatos(){
    this.platoService.listar().subscribe(data => {
        this.platos = data;
    });
  }

  filtrarClientes(val : any){
    if(val != null && val.dui != null){
      return this.clientes.filter(option => 
      option.nombreCompleto.toLowerCase().includes(val.nombreCompleto.toLowerCase()) || option.dui.includes(val.dui));
    } else {
      return this.clientes.filter(option => 
      option.nombreCompleto.toLowerCase().includes(val.toLowerCase()) || option.dui.includes(val.dui));
    }
  }

  filtrarPlatos(val : any){
    if(val != null && val.nombre != null){
      return this.platos.filter(option => 
      option.nombre.toLowerCase().includes(val.nombre.toLowerCase()));
    } else {
      return this.platos.filter(option => 
      option.nombre.toLowerCase().includes(val.toLowerCase()));
    }
  }

  seleccionarCliente(e : any){
    this.cliente = e.option.value;
    this.ctrlCliente.disable();
  }
  
  seleccionarPlato(e : any){
    this.plato = e.option.value;
  }

  mostrarSeleccion(val : Cliente){
    return val ? `${val.nombreCompleto}` : val;
  }

  mostrarSeleccionPlato(val : Plato){
    return val ? `${val.nombre}` : val;
  }

  agregar(){
    let det = new Detalle();
    det.plato = this.plato;
    det.cantidad = this.cantidad;

    this.detalle.push(det);
    this.total += det.plato.precio * det.cantidad;

    this.dataSource = new MatTableDataSource(this.detalle);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  remover(det : Detalle){
    this.total -= det.plato.precio * det.cantidad;

    let indices = [];
    for(let i = 0; i< this.detalle.length; i++){
      this.detalle[i]._index = i;
      indices.push(i);
    }

    let index = indices.indexOf(det._index);
    this.detalle.splice(index, 1);

    this.dataSource = new MatTableDataSource(this.detalle);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  aceptar(){
    let consumo = new Consumo();
    consumo.detalle = this.detalle;
    consumo.fechaPedido = new Date();
    consumo.total = this.total;

    if(this.cliente == undefined){
      this.cliente = new Cliente();
      let nombreCompleto = this.form.value['cliente'];
      this.cliente.nombreCompleto = nombreCompleto;
      this.cliente.dui = '00000000';

      this.clienteService.registrar(Object.assign({}, this.cliente)).then(data => {
        this.cliente.id = data.id;
        consumo.cliente = this.cliente;

        this.consumoService.registrar(consumo).then(()=>{
          this.emitirMensaje();
        });
      });
    }else{
      consumo.cliente = this.cliente;
      console.log(consumo);
      this.consumoService.registrar(consumo).then(()=>{
        this.emitirMensaje();
      });
    }
  }

  aceptarTransaccion(){
    let consumo = new Consumo();
    consumo.detalle = this.detalle;
    consumo.fechaPedido = new Date();
    consumo.total = this.total;

    if(this.cliente == undefined){
      this.cliente = new Cliente();
      let nombreCompleto = this.form.value['cliente'];
      this.cliente.nombreCompleto = nombreCompleto;
      this.cliente.dui = '00000000';
    }
    consumo.cliente = this.cliente;
    this.consumoService.registrarTransaccion(consumo, this.cliente).then(() =>{
      this.emitirMensaje();
    });
  }

  emitirMensaje(){
    this.snackBar.open("Se registro exitosamente", 'AVISO', {
      duration: 2000
    });

    setTimeout(() => {
      this.limpiar();
    }, 2000);
  }

  limpiar(){
    this.detalle = [];
    this.dataSource = new MatTableDataSource(this.detalle);
    this.cliente = new Cliente;
    this.total = 0;

    this.form = this.builder.group({
      'cliente' : this.ctrlCliente,
      'plato' : this.ctrlPlato,
      'fecha' : new FormControl(new Date()),
      'cantidad' : new FormControl(0) 
    });
  }

}
