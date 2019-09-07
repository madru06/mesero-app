import { LoginComponent } from './login/login.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConsumoComponent } from './pages/consumo/consumo.component';
import { PlatoComponent } from './pages/plato/plato.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlatoEdicionComponent } from './pages/plato/plato-edicion/plato-edicion.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { PerfilComponent } from './pages/perfil/perfil.component';


const routes: Routes = [
  { path: 'plato', component: PlatoComponent, children: 
    [
      { path: 'nuevo', component: PlatoEdicionComponent},
      { path: 'edicion/:id', component: PlatoEdicionComponent}
    ] 
  }, 
  { path: 'consumo', component: ConsumoComponent},
  { path: 'consulta', component: ConsultaComponent},
  { path: 'reporte', component: ReporteComponent},
  { path: 'cliente', component: ClienteComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
