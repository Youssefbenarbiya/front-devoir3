import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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



  ngOnInit(): void {
    this.chargerEquipes();
  }
  constructor(private equipeService: EquipeService,
    public authService: AuthService,
    private cdRef: ChangeDetectorRef) { }

chargerEquipes() {
this.equipeService.listeEquipes().subscribe(eqips => {
this.equipes = eqips;

this.equipes.forEach((equipe) => {
  equipe.imageStr = 'data:' + equipe.images[0].type + ';base64,' +  equipe.images[0].image;

});

this.cdRef.detectChanges();
});
}

supprimerEquipe(equipe: Equipe) {
  let conf = confirm("Etes-vous sûr ?");
  if (conf) {
    this.equipeService.supprimerEquipe(equipe.idEquipe).subscribe(() => {
      console.log("Equipe supprimée");
      this.chargerEquipes(); // Refresh the list after deletion
    });
  }}
}
