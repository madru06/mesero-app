import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlatoComponent } from './pages/plato/plato.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from 'src/environments/environment';
import { PlatoEdicionComponent } from './pages/plato/plato-edicion/plato-edicion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PlatoModalComponent } from './pages/plato/plato-modal/plato-modal.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ConsumoComponent } from './pages/consumo/consumo.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { DialogoComponent } from './pages/consulta/dialogo/dialogo.component';
import { LoginComponent } from './login/login.component';



/*

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, FirestoreSettingsToken } from '@angular/fire/firestore';
import { PlatoComponent } from './pages/plato/plato.component';
import { PlatoListaComponent } from './pages/plato/plato-lista/plato-lista.component';
import { PlatoEdicionComponent } from './pages/plato/plato-edicion/plato-edicion.component';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
*/
@NgModule({
  declarations: [
    AppComponent,
    PlatoComponent,
    PlatoEdicionComponent,
    PlatoModalComponent,
    ClienteComponent,
    ConsultaComponent,
    ConsumoComponent,
    PerfilComponent,
    ReporteComponent,
    DialogoComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule, 
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    FormsModule,
    AngularFireAuthModule
  ],
  entryComponents:[
    PlatoModalComponent, DialogoComponent
  ],
  providers: [
    AngularFirestore,
    { provide: FirestoreSettingsToken, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
