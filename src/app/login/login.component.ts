import { Component, OnInit } from '@angular/core';
import { LoginService } from '../_service/login.service';
import { Router } from '@angular/router';
import { fadeInContent } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario : string;
  clave : string;

  estadoLogin : boolean = true;
  estadoRecuperar : boolean;
  estadoCrear : boolean;

  constructor(
    private loginService : LoginService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  login(){
    this.loginService.login(this.usuario, this.clave).then(() => {
      this.router.navigate(['plato']);
    });
  }

  loginFacebook(){
    this.loginService.loginFacebook();
  }

  loginGoogle(){
    this.loginService.loginGoogle();
  }

  restablecerClave(){
    this.loginService.restablecerClave(this.usuario).then( data => {
      //console.log(data);
    });
  }

  crearUsuario(){
    this.loginService.registrarUsuario(this.usuario, this.clave);
    this.irLogin();
  }

  irCrear(){
    this.estadoCrear = true;
    this.estadoLogin= false;
    this.estadoRecuperar = false;
  }

  irLogin(){
    this.estadoLogin = true;
    this.estadoRecuperar= false;
    this.estadoCrear = false;
  }
  irRecuperar(){
    this.estadoRecuperar = true;
    this.estadoLogin= false;
    this.estadoCrear = false;
  }
}
