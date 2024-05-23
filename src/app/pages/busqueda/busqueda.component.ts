import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit{
  
  public terminoBusqueda: string =""
  public lista_usuarios: Usuario [] = []
  public lista_medicos: Medico [] = []
  public lista_hospitales: Hospital [] = []



  constructor(
    private activatedRoute: ActivatedRoute,
    private busquedaService: BusquedasService
  ){

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

        // console.log(params)
        this.terminoBusqueda = params.termino

        this.busquedaGlobal( this.terminoBusqueda )
      }
    )

   


  }


  busquedaGlobal(termino: string){

    this.busquedaService.buscarGlobal(termino)
    .subscribe(
      (resp : any) => {

        // console.log(resp)
          //la respuesta tiene este formato
          // {ok: true, usuarios: Array(6), hospitales: Array(1), medicos: Array(2)}
        
          this.lista_usuarios = resp.usuarios
       
          this.lista_hospitales = resp.hospitales
        
          this.lista_medicos = resp.medicos
        
      }
    )
  }


  abrirMedico(medico: Medico){
    
  }


}
