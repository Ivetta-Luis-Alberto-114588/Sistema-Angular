import { NgModule } from '@angular/core';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { ModalImageComponent } from './modal-image/modal-image.component';



@NgModule({
    imports: [FormsModule],
    exports: [IncrementadorComponent, ModalImageComponent],
    declarations: [IncrementadorComponent, ModalImageComponent],
    providers: [],
})
export class ComponentsModule { }
