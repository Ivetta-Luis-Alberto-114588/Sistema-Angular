import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy{

  public lista_hospitales : Hospital[] = []
  public cargando : boolean = true
  modalService: any;
  public subscription! : Subscription

  constructor(private hospitalService: HospitalService, private modalImagenService: ModalImagenService){}
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
  
  ngOnInit(): void {
    this.cargarHospital()    


    this.subscription  = this.modalImagenService.nuevaImagen
    .pipe(
      delay(100)
    )
    .subscribe( () => {this.cargarHospital()})
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

  async abrirSweetAlertModal(){
    const valor = await Swal.fire({
      title: "Ingrese hospital a crear",
      input: "text",
      inputPlaceholder: "Ingrese el nombre",
      showCancelButton: true,
    });
    if (valor.value) {
      this.hospitalService.crearHospital(valor.value)
        .subscribe( resp => {
          this.cargarHospital()  
          Swal.fire(`Se creo el hospital : ${valor.value}`);
        })      
    } else {
      Swal.fire('Ingrese nombre', '', 'error')
    }
  }

  abrirModal(hospital: Hospital){
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img)
  }
}
