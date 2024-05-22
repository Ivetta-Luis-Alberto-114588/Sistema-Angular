import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  
  public formMedico! : FormGroup;
  public lista_hospitales: Hospital[]= []
  public hospitalSeleccionado! : Hospital
  
  ngOnInit(): void {
    
    this.formMedico = this.fb.group({
      nombre : ['luis', Validators.required],
      hospital: ["", Validators.required]
    })

    this.cargarHospitales()

    this.formMedico.get('hospital')?.valueChanges.subscribe(
      hosp_id => {
       this.hospitalSeleccionado = this.lista_hospitales.find(x => x._id === hosp_id) as Hospital
       
      } )
    
      
  }

  constructor( private fb: FormBuilder, private hospitalService: HospitalService){}

  guardarMedico(){
    console.log(this.formMedico)
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales().subscribe(
      resp => {
        this.lista_hospitales = resp
      }
    )
  }
  


}
