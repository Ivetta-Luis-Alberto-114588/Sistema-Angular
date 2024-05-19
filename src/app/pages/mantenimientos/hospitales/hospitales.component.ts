import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit{

  public lista_hospitales : Hospital[] = []
  public cargando : boolean = true

  constructor(private hospitalService: HospitalService){}
  
  ngOnInit(): void {
    this.cargarHospital()    
  }


  
  cargarHospital(){
    this.cargando = true
    this.hospitalService.cargarHospitales()
      .subscribe( resp => {
        this.cargando = false
        this.lista_hospitales = resp
      })

  }
}
