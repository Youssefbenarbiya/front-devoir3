import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipesComponent } from './equipes/equipes.component';
import { AddEquipeComponent } from './add-equipe/add-equipe.component';
import { UpdateEquipeComponent } from './update-equipe/update-equipe.component';
import { RechercheParLigueComponent } from './recherche-par-ligue/recherche-par-ligue.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeLiguesComponent } from './liste-ligues/liste-ligues.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { EquipeGuard } from './equipe.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

const routes: Routes = [
  {path:"equipes",component:EquipesComponent},
  {path:"addEquipe",component:AddEquipeComponent,canActivate:[EquipeGuard]},
  {path:"updateEquipe/:id",component:UpdateEquipeComponent},
  {path: "rechercheParLigue", component : RechercheParLigueComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  {path: "listeLigues", component : ListeLiguesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path:'register',component:RegisterComponent},
  { path: 'verifEmail', component: VerifEmailComponent },
  {path:"",redirectTo:"equipes",pathMatch:"full"},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
