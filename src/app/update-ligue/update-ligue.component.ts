import { EquipeService } from './../services/equipe.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ligue } from '../model/ligue.model';

@Component({
  selector: 'app-update-ligue',
  templateUrl: './update-ligue.component.html',
})
export class UpdateLigueComponent implements OnInit {
  @Input() ligue!: Ligue;
  @Input() ajout!: boolean;

  @Output() ligueUpdated = new EventEmitter<Ligue>();

  constructor(private equipeService: EquipeService) {}

  ngOnInit(): void {
    console.log("ngOnInit du composant UpdateLigue", this.ligue);
  }

  saveLigue() {
    if (this.ajout) {
      // Call the add method when 'ajout' is true
      this.equipeService.ajouteLigue(this.ligue).subscribe({
        next: (ligue) => {
          this.ligueUpdated.emit(ligue); // Emit the new ligue to the parent
        },
        error: (err) => console.error('Erreur lors de l\'ajout de la ligue:', err)
      });
    } else {
      // Call the update method when modifying an existing ligue
      this.equipeService.updateLigue(this.ligue).subscribe({
        next: (updatedLigue) => {
          this.ligueUpdated.emit(updatedLigue); // Emit the updated ligue to the parent
        },
        error: (err) => console.error('Erreur lors de la mise à jour de la ligue:', err)
      });
    }
  }

  modeAjout() {
    this.ajout = true;
    this.ligue.idLigue = 0;
    this.ligue.nomLigue = '';
  }
}
