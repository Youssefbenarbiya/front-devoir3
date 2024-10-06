import { Component } from '@angular/core';
import { Equipe } from '../model/equipe.model';
import { EquipeService } from '../services/equipe.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
})
export class RechercheParNomComponent {
  nomEquipe! : string;
  equipes! : Equipe[];
  allEquipes! : Equipe[];
  searchTerm!: string;
  constructor(private equipeService:EquipeService){
    
  }

  ngOnInit(): void { this.equipeService.listeEquipes().subscribe(eqips => { console.log(eqips);
     this.equipes = eqips; }); }
supprimerEquipe(_t26: any) {
throw new Error('Method not implemented.');
}

rechercherEqips() {
  this.equipeService.rechercherParNom(this.nomEquipe).subscribe(eqips => {
  this.equipes = eqips;
  console.log(eqips)});}

  onKeyUp(filterText : string){ 
    this.equipes = this.allEquipes.filter(item => item.nomEquipe.toLowerCase().includes(filterText)); }

}
