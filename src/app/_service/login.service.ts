import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Usuario } from '../_models/usuario';
import { $ } from 'protractor';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private afa : AngularFireAuth,
    private afs : AngularFirestore,
    private router : Router
  ) { }

  login(usuario : string, clave : string){
    return this.afa.auth.signInWithEmailAndPassword(usuario, clave).then(res => {
      //console.log(res);
      this.actualizarUsuarioData(res.user);
    });
  }

  loginFacebook(){
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  loginGoogle(){
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider : any){
    return this.afa.auth.signInWithPopup(provider).then( credencial => {
      console.log(credencial);
      this.actualizarUsuarioData(credencial.user);
    });
  }

  restablecerClave(email : string){
    return this.afa.auth.sendPasswordResetEmail(email);
  }

  registrarUsuario(usuario : string, clave : string){
    return this.afa.auth.createUserWithEmailAndPassword(usuario, clave);
  }

  private actualizarUsuarioData(usuario : any){
    const userRef : AngularFirestoreDocument<Usuario> = this.afs.doc(`usuarios/${usuario.uid}`);

    userRef.valueChanges().subscribe(data => {
      const datos: Usuario = {
        uid: usuario.uid,
        email: usuario.email,
        roles: ['USER']
      }
      return userRef.set(datos);
    });
  }

  cerrarSesion(){
    return this.afa.auth.signOut().then( () => {
      this.router.navigate(['login']);
    });
  }
}
