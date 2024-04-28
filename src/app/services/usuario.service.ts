import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, pipe, map, catchError, of } from 'rxjs';


import { registerFormInterface } from '../interfaces/registerForm.interface';
import { enviroment } from 'src/enviroments/enviroment';
import { loginFormInterface } from '../interfaces/loginForm.interface';

declare const google: any
declare const gapi : any

@Injectable({
  providedIn: 'root'
})


export class UsuarioService {
  
  base_url = enviroment.base_url ;


  public auth2: any

  constructor(
    private http : HttpClient,
    private router: Router,
    private ngZone: NgZone   
  ) { 
    // this.googleInit() 
  }


  //esto lo uso para salir de google
  googleInit(){
    gapi.load('auth2'), () => {
      this.auth2 = gapi.auth2.init({
        client_id: "1098957435153-cjhs40btr7pg9iutn6d24f45kg8448d9.apps.googleusercontent.com",
        cookiepolicy: 'single_host_origin',
      })
     
    };   
  }


  logout(){
    localStorage.removeItem('token')

    //lo que hago aca es tambien limpiar el boton de autenticacion de google
    google.accounts.id.revoke('laivetta@gmail.com', ()=>{
    
    //este ngzone es porque la consola me recomienza usarla
    //sirve para ejecutar codigo de Angular en librerias externas
      this.ngZone.run( () => {
      this.router.navigateByUrl('/login')

    })
      
    //ahora uso lo de google para salir  
    // this.auth2.signOut().then( () => {
      
    //   console.log('usuario deslogueado de google')
      
    // })

    })

   }

  validarToken(): Observable<boolean>{
    
    //obtengo el token del localstorage
    const token = localStorage.getItem('token') || ''
    
    //hago un renvovar token con el token guardado en el localstorage
    // armo el header para enviar el x-token que defini en postman
    return this.http.get(`${this.base_url}/login/renew`, {
      headers: {
        'x-token': token}
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token)
      }),
      map( resp => true),
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
