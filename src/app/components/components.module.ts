import { NgModule } from '@angular/core';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';



@NgModule({
    imports: [FormsModule],
    exports: [IncrementadorComponent],
    declarations: [IncrementadorComponent],
    providers: [],
})
export class ComponentsModule { }
