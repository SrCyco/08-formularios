import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
  `]
})
export class TemplateComponent implements OnInit {
  usuario:Object = {
    nombre: null,
    apellido: null,
    email: null,
    pais: '',
    genero: 'Hombre',
    acepta: false
  }

  paises = [{
      codigo: 'COL',
      nombre: 'Colombia'
    },
    {
      codigo: 'CRC',
      nombre: 'Costa Rica'
    }
  ];

  generos = ['Hombre', 'Mujer', 'Binario'];

  constructor() { }

  ngOnInit() {
  }

  guardar( forma: NgForm) {
    console.log('ngForm', forma);
    console.log('value Form', forma.value);
    console.log('usuario', this.usuario);
  }

}
