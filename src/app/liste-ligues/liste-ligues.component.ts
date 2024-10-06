import { Component, OnInit } from '@angular/core';
import { Ligue } from '../model/ligue.model';
import { EquipeService } from '../services/equipe.service';

@Component({
  selector: 'app-liste-ligues',
  templateUrl: './liste-ligues.component.html',
})
export class ListeLiguesComponent implements OnInit {
  ligues!: Ligue[];
  ajout: boolean = true;
  updatedligue: Ligue = { idLigue: 0, nomLigue: '' };

  constructor(private equipeService: EquipeService) {}

  ngOnInit(): void {
    this.chargerLigues();
  }

  chargerLigues() {
    this.equipeService.listeLigues().subscribe(ligs => {
      this.ligues = ligs._embedded.ligues;
      console.log(ligs);
    });
  }

  updatedLigue(lig: Ligue) {
    this.updatedligue = { ...lig };
    this.ajout = false;
  }

  ligueUpdated(lig: Ligue) {
    console.log('Ligue reçue du composant updateLigue', lig);
    
    if (this.ajout) {
      // Adding a new ligue
      this.equipeService.ajouteLigue(lig).subscribe(() => {
        this.chargerLigues();  // Reload the ligue list
        this.resetForm();
      });
    } else {
      // Updating an existing ligue
      this.equipeService.updateLigue(lig).subscribe(() => {
        this.chargerLigues();  // Reload the ligue list
        this.resetForm();
      });
    }
  }
  

  supprimerCategorie(cat: Ligue) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) {
      this.equipeService.supprimerLigue(cat.idLigue).subscribe(() => {
        console.log('Ligue supprimée');
        this.chargerLigues();
      });
    }
  }

  resetForm() {
    this.updatedligue = { idLigue: 0, nomLigue: '' };
    this.ajout = true;
  }
}
