import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit{
  
  public terminoBusqueda: string =""

  constructor(private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    this.obtenerParametroBusqueda()
  }


  obtenerParametroBusqueda(){
    this.activatedRoute.params.subscribe(
      (params : any) => {
        // la respuesta de params es un objeto con esta estructura 
        // {termino: 'fadfaf'} por lo tanto tengo que entrar al objeto
        // la palabra termino es la que habia definido en el page-routing de la siguiente forma
        // {path: "buscar/:termino", component: BusquedaComponent, data : {titulo: 'Busquedas'}},

        console.log(params)
        this.terminoBusqueda = params.termino
      }
    )
  }


}
