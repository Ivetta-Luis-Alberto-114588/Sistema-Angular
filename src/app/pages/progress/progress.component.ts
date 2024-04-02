import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

 progress1: number = 80
 progress2: number = 30


changeProgress1(valor:any){
  this.progress1 = valor
}

changeProgress2(valor:any){
  this.progress2 = valor
}

}
