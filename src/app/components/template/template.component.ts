import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {PaisService} from '../../services/pais.service';

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
  usuario: object = {
    nombre: null,
    apellido: null,
    email: null,
    pais: '',
    genero: 'Hombre',
    acepta: false
  }

  public paises: any[];

  generos = ['Hombre', 'Mujer', 'Binario'];

  constructor(
    private paisService: PaisService
  ) { }

  ngOnInit() {
    this.paisService.getPaises()
      .subscribe((resp: any) => {
        this.paises = resp;
    });
  }

  guardar( forma: NgForm) {
    console.log('ngForm', forma);
    console.log('value Form', forma.value);
    console.log('usuario', this.usuario);
  }

}
