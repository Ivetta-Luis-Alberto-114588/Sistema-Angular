import { NgModule } from '@angular/core';

import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [BreadcrumsComponent, SidebarComponent, HeaderComponent],
    imports: [  RouterModule, CommonModule],
    exports: [BreadcrumsComponent, SidebarComponent, HeaderComponent],
    providers: [],
})
export class SharedModule {}