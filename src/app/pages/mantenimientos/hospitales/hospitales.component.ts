import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

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

  guardarCambios(hospital: Hospital){
    this.hospitalService.actualizarHospital(hospital._id!, hospital.nombre)
      .subscribe( resp => {
        Swal.fire('Actualizado', hospital.nombre, 'success' )
      })
  }

  borrarHospital(hospital: Hospital){
    this.hospitalService.borrarHospital(hospital._id!)
      .subscribe( resp => {
        this.cargarHospital()  
        Swal.fire('Hospital borrado', hospital.nombre, 'success')
      })
  }
}
