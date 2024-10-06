import { Component, OnInit } from '@angular/core';
import { Equipe } from '../model/equipe.model';
import { AuthService } from '../services/auth.service';
import { EquipeService } from '../services/equipe.service';

@Component({
  selector: 'app-equipes',
  templateUrl: './equipes.component.html'
})
export class EquipesComponent implements OnInit {

  equipes?: Equipe[]; // Array to hold Equipe objects
  apiURL: string = 'http://localhost:8090/equipes/api'; // API base URL

  constructor(private equipeService: EquipeService,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.chargerEquipes();
  }

  chargerEquipes() {
    this.equipeService.listeEquipes().subscribe(eqips => {
      this.equipes = eqips;

      // If you need to handle images (assuming 'imagePath' is part of the model)
      this.equipes.forEach((equipe) => {
      
          equipe.imageStr = this.apiURL + '/image/loadfromFS/' + equipe.idEquipe;
        
      });
    });
  }

  supprimerEquipe(equipe: Equipe) {
    let conf = confirm("Etes-vous sûr ?");
    if (conf) {
      this.equipeService.supprimerEquipe(equipe.idEquipe).subscribe(() => {
        console.log("Equipe supprimée");
        this.chargerEquipes(); // Refresh the list after deletion
      });
    }
  }
}
