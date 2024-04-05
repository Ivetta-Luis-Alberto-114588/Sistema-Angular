import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {
  
  
  ngOnInit(): void {
    // const promesa = new Promise( (resolve, reject)=> {
    //   resolve("hola promesa"),
    //   reject("error")
    // })

    
    
    // promesa.then( ()=>{
    //   console.log("terminado")
    // } )
    
    // console.log("fin iniit");

    this.getUsuarios()

  }

  getUsuarios(){
    fetch('https://reqres.in/api/users?page=2').then( (res)=>{
      res.json().then( x => console.log(x.data))
    } )
  }


}
