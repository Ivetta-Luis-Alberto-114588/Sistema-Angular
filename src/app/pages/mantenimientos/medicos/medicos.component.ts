import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay, map } from 'rxjs';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy{

  lista_medicos : Medico[] = []
  lista_medicos_tmp : Medico[] = []
  public cargando: boolean = true
  private imgSubscription! : Subscription

 
  constructor(
      private medicosService: MedicoService,
      private modalImagenService: ModalImagenService, 
      private busquedaService: BusquedasService){}
  
    
    ngOnDestroy(): void {
     this.imgSubscription.unsubscribe()
    }
  
    ngOnInit(): void {
      this.cargarMedicos()

      this.imgSubscription= this.modalImagenService.nuevaImagen
        .pipe( delay(100))
        .subscribe( img => this.cargarMedicos())

    }

    cargarMedicos(){
      this.cargando = true
      this.medicosService.getMedicos()
        .subscribe((resp: any) => {
          this.lista_medicos = resp;
          this.lista_medicos_tmp = resp;
          this.cargando = false
        });
    }


    buscarMedico(valor: string){
      if( valor.trim().length === 0 ){
       return this.cargarMedicos()
      }
  
      this.busquedaService.buscar('medicos', valor).subscribe(
       (resp : any) => {
        this.lista_medicos = resp
       }
      )
    }

    abrirModal(medico: Medico){
      this.modalImagenService.abrirModal('medicos', medico._id, medico.img)
      this.cargarMedicos()
    }

    borrarMedico(medico: Medico) {
      Swal.fire({
        title: "Esta seguro",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.medicosService.borrarMedico(medico._id).subscribe(() => {
            
            this.cargarMedicos();

            Swal.fire({
              title: "Borrado!",
              text: `${medico.nombre} ha sido borrado`,
              icon: "success"
            });            
          });
        }
      });
    }
}
  
