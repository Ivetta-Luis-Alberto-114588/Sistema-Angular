import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginFormInterface } from 'src/app/interfaces/loginForm.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css' ]
})

export class LoginComponent {

  public formSubmitted = false

  public loginForm = this.fb.group({

    email: ['laivetta@gmail.com', [ Validators.email, Validators.required ] ],
    password: ['123', [ Validators.required]],
    remember: [false]    
  })
  
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ){}

  login()  {
    // console.log(this.loginForm.value)
    //puedo guardar el token aca en el metodo next o directamente en el servicio

    this.usuarioService.login(this.loginForm.value as loginFormInterface).subscribe({
      next: (data: any) => {  console.log(data)
        // Swal.fire("info",data.token, "info"),
        // localStorage.setItem('token', data.token)
        },
      error: e => { Swal.fire("error", e.error.msg, "error") }
    })

    // this.router.navigateByUrl("dashboard")
  }
}
