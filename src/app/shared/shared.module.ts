import { NgModule } from '@angular/core';

import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
    declarations: [BreadcrumsComponent, SidebarComponent, HeaderComponent],
    imports: [  ],
    exports: [BreadcrumsComponent, SidebarComponent, HeaderComponent],
    providers: [],
})
export class SharedModule {}