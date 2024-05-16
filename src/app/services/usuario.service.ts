import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, pipe, map, catchError, of, delay } from 'rxjs';


declare const google: any

import { enviroment } from 'src/enviroments/enviroment';

import { registerFormInterface } from '../interfaces/registerForm.interface';
import { ICargarUsuarios } from '../interfaces/cargar-usuarios.interface';
import { loginFormInterface } from '../interfaces/loginForm.interface';

import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})


export class UsuarioService {
  
  base_url = enviroment.base_url ;

  public usuario! : Usuario  // el VALIDAR TOKEN ES EL QUE LLENA EL USUARIO

  constructor(
    private http : HttpClient,
    private router: Router,
    private ngZone: NgZone   
  ) { 
    this.googleInit() 
  }

  get token() : string {
     //obtengo el token del localstorage
    return localStorage.getItem('token') || ''
  }

  get uid() :  string {
    return this.usuario.uid || ''
  }

  get headers(){
    return {
      headers: {
      'x-token': this.token
      }
    }
  }

  googleInit(): Promise<any> {
    return new Promise( (resolve) => {
      google.accounts.id.initialize({
        client_id: "1098957435153-cjhs40btr7pg9iutn6d24f45kg8448d9.apps.googleusercontent.com",
        callback: (response: any) => resolve(response)
        // Evitamos que la referencia al this en en handle metodo no cambie
      });
    });
  };


  logout(){

    localStorage.removeItem('token');

    this.googleInit();

    google.accounts.id.revoke('laivetta@gmail.com', ()=>{
      this.router.navigateByUrl('/login');
    });
  };


  validarToken(): Observable<boolean>{
    
    //hago un renvovar token con el token guardado en el localstorage
    // armo el header para enviar el x-token que defini en postman
    return this.http.get(`${this.base_url}/login/renew`, {
      headers: {
        'x-token': this.token}
    }).pipe(
      map( (resp: any) => {
        const {nombre, email, img = '',  google, role, uid} = resp.usuario
        // console.log( "imangen ->", resp)
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid)

        localStorage.setItem('token', resp.token)

        return true
      }),
   
      //aca lo que hago es si hay un error devuelvo un observable false y en el guard lo redirecciona
      // al /login
      catchError( error => of (false))
    )
  }


  crearUsuario(formdata: registerFormInterface){

    console.log("creando usuario")
      
    return this.http.post(`${this.base_url }/usuarios`, formdata)
        //tambien puedo guardar el token en el componente cuando se ejecuta la funcion next
        .pipe(
          tap( (resp : any) =>{
            localStorage.setItem('token', resp.token)
          })
        )
  }


  login(loginForm: loginFormInterface){

    return this.http.post(`${ this.base_url }/login`, loginForm)
    //tambien puedo guardar el token en el componente cuando se ejecuta la funcion next
                .pipe(
                  tap( (resp : any) =>{
                    localStorage.setItem('token', resp.token)
                  })
                )

  }

  loginGoogle( token: string ) {
    return this.http.post( `${this.base_url}/login/google`, { token } )
          .pipe(
            tap( (resp : any) =>{
              // console.log(resp)
              localStorage.setItem('token', resp.token)
            })
          )
  }

  actualizarPerfil( data: {nombre: string, email: string, role: string}){

    data = {
      ... data,
      role: this.usuario.role
    }


    return this.http.put( `${ this.base_url }/usuarios/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    } )
  }

  cargarUsuarios( desde : number = 0){

    const url = `${this.base_url}/usuarios?desde=${desde}`
    
    return this.http.get<ICargarUsuarios>( url , this.headers)
      .pipe(
        //pongo el delay para que se muestre el loading de la pagina
        delay(500),
        map ( resp => {

          const usuarios = resp.usuarios.map( 
            item =>  new Usuario(item.nombre, item.email, item.password, item.img, item.google, item.role, item.uid) )

          return {
            total: resp.total,
            usuarios
            
          }
        })
      )
          
  }

  eliminarUsuario( usuario: Usuario ){

    const url = `${this.base_url}/usuarios/${usuario.uid}`

    return this.http.delete(url, this.headers)
  }


  
  guardarUsuario( usuario: Usuario){

    return this.http.put( `${ this.base_url }/usuarios/${ usuario.uid }`, usuario, this.headers )
  }

}
