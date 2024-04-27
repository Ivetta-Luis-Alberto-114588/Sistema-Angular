import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginFormInterface } from 'src/app/interfaces/loginForm.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

//esto es para poder usar todo lo de google y no tener que usar un sdk
//tener en cuenta que en el index hay una funcion de javascript para que tenga la funcionalidad
declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' ]
})


export class LoginComponent implements AfterViewInit {

  //esto es para poder usar el boton de google del html
  @ViewChild('googleBtn') googleBtn! : ElementRef;

  public formSubmitted = false

  public loginForm = this.fb.group({

    email: [localStorage.getItem('email') || '', [ Validators.email, Validators.required ] ],
    password: ['', [ Validators.required]],
    remember: [false]    
  })
  
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ){}

//autenticacion de google, despues que se renderiza el componente, para poder llamar a la funcion
  ngAfterViewInit(): void {

   this.googleInit()

  }


  //autenticacion de google
  googleInit(){
    google.accounts.id.initialize({
      client_id: "1098957435153-cjhs40btr7pg9iutn6d24f45kg8448d9.apps.googleusercontent.com",
      callback: ( response : any ) => this.handleCredentialResponse (response)
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      // document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  //autenticacion de google
  handleCredentialResponse( response: any ){
    // console.log("Encoded JWT ID token: " + response.credential);

    this.usuarioService.loginGoogle(response.credential).subscribe( resp => {
      // console.log( {login: resp})
      this.router.navigateByUrl("/")
    }  )
  }

  login()  {
    // console.log(this.loginForm.value)
    //puedo guardar el token aca en el metodo next o directamente en el servicio

    this.usuarioService.login(this.loginForm.value as loginFormInterface).subscribe({
      next: (data: any) => {  console.log(data)
        // Swal.fire("info",data.token, "info"),
        // localStorage.setItem('token', data.token)

        //me fijo si el remember es true entonces guardo el mail en el localstorage
        if(this.loginForm.get('remember')?.value){
          localStorage.setItem('email', this.loginForm.get('email')?.value || '' )
        } else {
          localStorage.removeItem('email')
        }

        },
      error: e => { Swal.fire("error", e.error.msg, "error") }
    })

    // this.router.navigateByUrl("dashboard")
  }
}
