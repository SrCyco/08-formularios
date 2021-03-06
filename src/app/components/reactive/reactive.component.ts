import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ValidadoresService} from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {
  public forma: FormGroup;

  constructor(
    private fb: FormBuilder,
    private validadores: ValidadoresService
  ) {
    this.crearFormulario();
    this.cargarData();
  }

  ngOnInit() {
  }

  get pasatiempos(): FormArray {
    return this.forma.get('pasatiempos') as FormArray;
  }
  get validationName(): boolean {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }
  get validationLastname(): boolean {
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched;
  }
  get validationMail(): boolean {
    return this.forma.get('correo').invalid && this.forma.get('correo').touched;
  }
  get validationDistrito(): boolean {
    return this.forma.get('direccion.distrito').invalid && this.forma.get('direccion.distrito').touched;
  }
  get validationCity(): boolean {
    return this.forma.get('direccion.ciudad').invalid && this.forma.get('direccion.ciudad').touched;
  }
  get pass1NoValid(): boolean {
    return this.forma.get('pass1').invalid && this.forma.get('pass1').touched;
  }
  get pass2NoValid(): boolean {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return pass1 !== pass2;
  }
  get usuarioNoValido() {
    return this.forma.get('usuario').invalid && this.forma.get('usuario').touched;
  }

  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, this.validadores.noHerrera]],
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    }, {
      validators: this.validadores.passwordsIguales('pass1', 'pass2')
    });
  }

  cargarData() {
    this.forma.patchValue({
      nombre: 'Sergio',
      apellido: 'Nino',
      correo: 'fullsanmons@gmail.com',
      pass1: '123',
      pass2: '123',
      direccion: {
        distrito: 'Antioquia',
        ciudad: 'Envigado'
      }
    });
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control('', Validators.required));
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    console.log(this.forma);
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach( control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach( controlChild => controlChild.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }

    this.forma.reset();

  }

}
