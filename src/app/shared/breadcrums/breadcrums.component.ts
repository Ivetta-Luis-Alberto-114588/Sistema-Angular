import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';


@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: [
  ]
})
export class BreadcrumsComponent implements OnDestroy {

  tituloPagina: string = ""

  susbscription : Subscription = new Subscription()


  constructor(private router: Router){

    this.susbscription = this.capturarTitulo().subscribe(
                              data => {
                                //para cambiar el titulo de la pagina por el definido en las rutas del page-routing.module.ts
                                this.tituloPagina= data['titulo']
                              
                              //para cambiar el titulo de la pestaña asi es el mismo que el que estoy navengado]  
                                document.title = data['titulo'] 
                              } 
                          )
  }

  ngOnDestroy(): void {
   this.susbscription.unsubscribe()
  }
 
  capturarTitulo(){
    return this.router.events
      .pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event: ActivationEnd) => event.snapshot.firstChild === null),
        map((event: ActivationEnd) => event.snapshot.data)
      )    
  }

}
