import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, pipe, map, catchError, of } from 'rxjs';


declare const google: any

import { registerFormInterface } from '../interfaces/registerForm.interface';
import { enviroment } from 'src/enviroments/enviroment';
import { loginFormInterface } from '../interfaces/loginForm.interface';
import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})


export class UsuarioService {
  
  base_url = enviroment.base_url ;

  public usuario! : Usuario

  constructor(
    private http : HttpClient,
    private router: Router,
    private ngZone: NgZone   
  ) { 
    this.googleInit() 
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
    
    //obtengo el token del localstorage
    const token = localStorage.getItem('token') || ''
    
    //hago un renvovar token con el token guardado en el localstorage
    // armo el header para enviar el x-token que defini en postman
    return this.http.get(`${this.base_url}/login/renew`, {
      headers: {
        'x-token': token}
    }).pipe(
      map( (resp: any) => {
        const {nombre, email, img = '',  google, role, uid} = resp.usuario
        console.log( "imangen ->", resp)
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


}
