import { DialogoComponent } from './dialogo/dialogo.component';
import { Consumo } from './../../_models/consumo';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ConsultaService } from './../../_service/consulta.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  dataSource : MatTableDataSource<Consumo>
  displayedColumns = ['cliente', 'fechaPedido', 'total', 'acciones'];
  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;
  @ViewChild(MatSort, {static : true}) sort : MatSort;
  
  fechaSeleccionada : Date = new Date();

  constructor(
    private consultaService : ConsultaService,
    private dialog : MatDialog
  ) { }

  ngOnInit() {
  }

  buscar(){
    this.consultaService.listar(this.fechaSeleccionada).subscribe(snapshot => {
      let consumos = [];
      snapshot.forEach((data : any) => {
        let consumo = new Consumo();
        consumo.id = data.payload.doc.id;
        consumo.cliente = data.payload.doc.data().cliente;
        consumo.total = data.payload.doc.data().total;
        consumo.fechaPedido = data.payload.doc.data().fechaPedido.toDate();
        consumo.detalle = data.payload.doc.data().detalle;
        consumos.push(consumo);
      });
      this.dataSource = new MatTableDataSource(consumos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  verDetalle(consumo : Consumo){
    this.dialog.open(DialogoComponent, {
      width: '250px',
      data: consumo
    })
  }

}
