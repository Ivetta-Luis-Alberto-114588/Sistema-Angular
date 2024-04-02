import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent {

  @Input('valor') progress:  number = 30
  @Input() btnClass : string = "btn btn-warning"

  @Output() emisor : EventEmitter<number> = new EventEmitter()
 


  restar(){
    if(this.progress <= 0) 
      {
        this.progress = 0      
        this.emisor.emit(this.progress)
      }
    else  
    {
      this.progress -= 10
      this.emisor.emit(this.progress)
    }
  }

  sumar(){
    if(this.progress >= 100)
      {
        this.progress = 100
        this.emisor.emit(this.progress)
      } 
    else 
      {
        this.progress +=10
        this.emisor.emit(this.progress)
      }
    
  }

}
