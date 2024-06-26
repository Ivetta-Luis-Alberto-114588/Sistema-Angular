import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

declare function funcionInicial(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  
  constructor( private sidebarService: SidebarService){

  }
  
  ngOnInit(): void {
    funcionInicial()

    this.sidebarService.cargarMenu()
  }

  
}
