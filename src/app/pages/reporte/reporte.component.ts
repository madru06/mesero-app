import { Component, OnInit } from '@angular/core';
import { ReporteService } from 'src/app/_service/reporte.service';
import * as moment from 'moment';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  chart : any;
  tipo : string;

  constructor(private reporteService : ReporteService) { }

  ngOnInit() {
    this.tipo = 'bar';
    this.dibujarCliente();
    this.reporteService.buscarConsumosClienteIden().subscribe(data => {
      console.log(data);
    });
  }

  dibujarCliente(){
    let fecha = new Date();
    fecha.setFullYear(2019);
    fecha.setMonth(7);
    fecha.setDate(29);
    fecha.setMinutes(0);
    fecha.setHours(0);
    fecha.setSeconds(0);
    this.reporteService.buscarPorFecha(fecha).subscribe((data : any) => {
      let fechas = data.map(res => moment(res.fechaPedido.toDate()).format('DD-MM-YYY HH:mm:ss'));
      let totales = data.map(res => res.total);
/*
      console.log(fechas);
      console.log(totales);
*/
      this.chart = new Chart('canvas', {
        type: this.tipo,
        data: {
          labels: fechas,
          datasets: [
            {
              label: 'Total',
              data: totales,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)'
              ]
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      });
    });
  }

  cambiar(tipo : string){
    this.tipo = tipo;
    if(this.chart){
      this.chart.destroy();
    }
    this.dibujarCliente();
  }

}
