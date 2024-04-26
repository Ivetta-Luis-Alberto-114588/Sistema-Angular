import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'  ]
})
export class RegisterComponent {

  public formSubmitted = false

  public registerForm = this.fb.group({
    nombre: [ 'luis', [ Validators.required, Validators.minLength(3) ]],
    email: ['laivetta@gmail.com', [ Validators.email, Validators.required ] ],
    password: ['123', [ Validators.required]],
    password2: ['123', [ Validators.required ] ],
    terminos:[ true, [ Validators.required ]]
  },
  //validadores personalizados
{
  validators: this.passwordsIguales('password','password2')
})

  constructor(
    private router: Router, 
    private fb: FormBuilder, 
    private usuarioService: UsuarioService
  ) {  }

  crearUsuario(){
    this.formSubmitted = true
    console.log("valores de formularios -> ",  this.registerForm.value )
    console.log("formulario completo -> ", this.registerForm )

    if(this.registerForm.invalid){
      return
    } 

    //realizar el post del fomrulario de registro
    this.usuarioService.crearUsuario( this.registerForm.value ).subscribe({
      next: (data) => console.log(data),
      error: (e) => {
          console.log(e.error.msg)
          Swal.fire("Error", e.error.msg, 'error')
        }
    })


  }

  campoNoValido( campo: string ): boolean{

    if( this.registerForm.get(campo)?.invalid && this.formSubmitted){
      return true
    } else {
      return false
    }
  }

  aceptaTerminos(){
    if(!this.registerForm.get('terminos')?.value && this.formSubmitted){
      return true
    } else {
      return false
    }
  }

  passwordNoValido(){
    const pass1 = this.registerForm.get('password')?.value
    const pass2 = this.registerForm.get('password2')?.value

    if( (pass1 !== pass2) && this.formSubmitted ){
      return true
    } else {
      return false
    }
  }

  passwordsIguales(pass1: string, pass2: string){
    //hago esto para cargar un error al formulario, esto lo hago, porque quiero ponerlo al formulario como no valido
    //ya que los pass solo son requeridos, y por eso si cargo ambos valores el formulario va a ser valido
    // auqnue las contraseñas no sean validas
    //hay que tener una funcion que regrese un objeto si hay errores o si no hay error que regrese null

    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1)
      const pass2Control = formGroup.get(pass2)

      if( pass1Control?.value === pass2Control?.value){
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({noEsIgual : true})
      }
    }
  }
}
