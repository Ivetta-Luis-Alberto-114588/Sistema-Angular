import { NgModule } from '@angular/core';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { ModalImageComponent } from './modal-image/modal-image.component';
import { CommonModule } from '@angular/common';



@NgModule({
    imports: [FormsModule, CommonModule],
    exports: [IncrementadorComponent, ModalImageComponent],
    declarations: [IncrementadorComponent, ModalImageComponent],
    providers: [],
})
export class ComponentsModule { }
