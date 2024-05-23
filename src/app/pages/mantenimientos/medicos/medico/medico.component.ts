import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  
  public formMedico! : FormGroup;
  public lista_hospitales: Hospital[]= []
  public hospitalSeleccionado! : Hospital
  public medicoSeleccionado! : Medico
  
  ngOnInit(): void {
    
    this.formMedico = this.fb.group({
      nombre : ["", Validators.required],
      hospital: ["", Validators.required]
    })

    //para cargar la lista de hospitales
    this.cargarHospitales()

    //para obtener el hospital seleccionado cada vez que cambia el select del front
    this.formMedico.get('hospital')?.valueChanges.subscribe(
      hosp_id => {
       this.hospitalSeleccionado = this.lista_hospitales.find(x => x._id === hosp_id) as Hospital
       
      } )

    //para obtener el id de la ruta y con eso buscar el medico que le correponde
    this.activatedRoute.params.subscribe(
      (resp : any) => {
       this.cargarMedico(resp.id)
      }
    )
    
      
  }

  constructor( 
    private fb: FormBuilder, 
    private hospitalService: HospitalService, 
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  cargarHospitales(){
    this.hospitalService.cargarHospitales().subscribe(
      resp => {
        this.lista_hospitales = resp
      }
    )
  }

  cargarMedico(id: string){

    if(id === 'nuevo'){
      return 
    }
    
    this.medicoService.getMedicoById(id)
    .subscribe(
      resp => {
        // desestructuro los datos, que tienen esta forma la resp
      //   {
      //     "_id": "664e30e4dab0fbbce4602b44",
      //     "nombre": "medico pedrin",
      //     "usuario": {
      //         "_id": "662e59039e09ab00ce4e08fb",
      //         "nombre": "luis",
      //         "img": "https://lh3.googleusercontent.com/a/ACg8ocLh8tj7cn1h36F3LsaEeFpj88Amo2sonObMv7A82PxWm4uKBrb6vA=s96-c"
      //     },
      //     "hospital": {
      //         "_id": "661bc1688fb06d5aa189438f",
      //         "nombre": "Hospital Rio Segundo",
      //         "img": "a05e1bc8-ff87-4bdd-b6d4-492bb8fab1aa.jpg"
      //     },
      //     "createdAt": "2024-05-22T17:52:36.277Z",
      //     "updatedAt": "2024-05-22T17:52:36.277Z"
      // },

        if(!resp){
          this.router.navigateByUrl(`/dashboard/medicos` )
          return
        }
        const {nombre, hospital: {_id}} = resp
        this.medicoSeleccionado = resp

        //asigno los valores al formulario asi se muestran cargados
        this.formMedico.setValue({nombre: nombre, hospital: _id})
      }
    )
  }

  obtenerMedicoById(_id: string){
    this.medicoService.getMedicoById(_id).subscribe(
      resp => {
        this.medicoSeleccionado = resp
      }
    )
  }

  guardarMedico(){

    if(this.medicoSeleccionado ){
      //actualizar
      
      const data = {
        ... this.formMedico.value,
        _id : this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data).subscribe(
        (resp : any) => {
          console.log(resp)
          Swal.fire({
            title: "Medico actualizado",
            text: `Se actualizo el medico ${resp.medico.nombre}`,
            icon: "success"
          });

        }
      )
    
      
    } else{
      //crear medico
      this.medicoService.crearMedico(this.formMedico.value)
      .subscribe( (resp: any) => {
        Swal.fire({
          title: "Medico Creado",
          text: `Se creo el medico ${resp.medico.nombre}`,
          icon: "success"
        });
        this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}` )
        
      })

    }

   
  }
  


}
