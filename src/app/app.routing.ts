import {ModuleWithProviders} from  "@angular/core";
import {Routes, RouterModule} from  "@angular/router";

//COMPONENTES

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { PartidosComponent } from './components/partidos/partidos.component';
import { PresidenteComponent } from './components/presidente/presidente.component';
import { AlcaldeComponent } from './components/alcalde/alcalde.component';


const appRoutes: Routes = [
{path: '', component: HomeComponent},
{path: '', redirectTo: 'home',pathMatch: 'full'},
{path: 'home', component: HomeComponent},
{path: 'register', component: RegisterComponent},
{path: 'login', component: LoginComponent},
{path: 'perfil', component: PerfilComponent},
{path: 'partidos', component: PartidosComponent},
{path: 'presidente', component: PresidenteComponent},
{path: 'alcalde', component: AlcaldeComponent},
{path: '**', component: HomeComponent},
]
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
