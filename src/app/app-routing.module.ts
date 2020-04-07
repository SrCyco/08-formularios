import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReactiveComponent} from './components/reactive/reactive.component';
import {TemplateComponent} from './components/template/template.component';
import {DataComponent} from './components/data/data.component';

const routes: Routes = [
  { path: 'template', component: TemplateComponent},
  { path: 'data', component: DataComponent},
  { path: 'reactive', component: ReactiveComponent},
  { path: '**', pathMatch: 'full', redirectTo: 'reactive'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
