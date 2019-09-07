import { Plato } from './../../_models/plato';
import { PlatoService } from './../../_service/plato.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { PlatoModalComponent } from './plato-modal/plato-modal.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit {

dataSource: MatTableDataSource<Plato>;
displayedColumns = ['nombre', 'precio', 'acciones'];
@ViewChild(MatPaginator,  {static: true}) paginator : MatPaginator;
@ViewChild(MatSort,  {static: true}) sort : MatSort;

  constructor(private platoService : PlatoService, public router : ActivatedRoute ,private snackbar : MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.platoService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  
  eliminar(plato : Plato){
    this.platoService.eliminar(plato).then(() => {
      this.snackbar.open('SE HA ELIMINADO UN REGISTRO', 'AVISO', {
        duration: 2000
      });
    });
  }

  abrirModal(plato : Plato){
    this.dialog.open(PlatoModalComponent, {
      width: '250px',
      data: plato
    });
  }
}

