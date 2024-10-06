import { Component, OnInit } from '@angular/core';
import { Equipe } from '../model/equipe.model';
import { Ligue } from '../model/ligue.model';
import { EquipeService } from '../services/equipe.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recherche-par-ligue',
  templateUrl: './recherche-par-ligue.component.html',
})
export class RechercheParLigueComponent implements OnInit{

  equipes! : Equipe[];
  IdLigue! : number;
  ligues! : Ligue[];

  constructor(private equipeService:EquipeService, public authService: AuthService){
  }
  supprimerEquipe(e:Equipe) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf)
       this.equipeService.supprimerEquipe(e.idEquipe).subscribe(() => {
        console.log("equipe supprimé");
        this.chargerEquipe();
      })
    }
    chargerEquipe() {
      this.equipeService.listeEquipes().subscribe(event =>{
        this.equipes = event
      }
        
      )
    }
  ngOnInit(): void {
    this.equipeService.listeLigues().
    subscribe(ligs => {this.ligues = ligs._embedded.ligues;
    console.log(ligs);
    });  }

    onChange() {
      this.equipeService.rechercherParLigue(String(this.IdLigue)).
      subscribe(eqips =>{this.equipes=eqips});
      }

      
}
