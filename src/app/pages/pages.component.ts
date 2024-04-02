import { Component, OnInit } from '@angular/core';

declare function funcionInicial(): any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [
  ]
})
export class PagesComponent implements OnInit {
  
    
  
  ngOnInit(): void {
    funcionInicial()
  }

  
}
