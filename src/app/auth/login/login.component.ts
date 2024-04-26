import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginFormInterface } from 'src/app/interfaces/loginForm.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';


declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' ]
})


export class LoginComponent implements AfterViewInit {

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


  ngAfterViewInit(): void {

   this.googleInit()

  }


  googleInit(){
    google.accounts.id.initialize({
      client_id: "1098957435153-cjhs40btr7pg9iutn6d24f45kg8448d9.apps.googleusercontent.com",
      callback: this.handleCredentialResponse
    });

    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      // document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any ){
    console.log("Encoded JWT ID token: " + response.credential);
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
