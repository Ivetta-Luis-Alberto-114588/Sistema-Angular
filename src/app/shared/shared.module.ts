import { NgModule } from '@angular/core';

import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [BreadcrumsComponent, SidebarComponent, HeaderComponent],
    imports: [  RouterModule, CommonModule, FormsModule],
    exports: [BreadcrumsComponent, SidebarComponent, HeaderComponent],
    providers: [],
})
export class SharedModule {}