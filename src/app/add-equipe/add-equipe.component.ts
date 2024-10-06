import { Component } from '@angular/core';
import { Equipe } from '../model/equipe.model';
import { EquipeService } from '../services/equipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ligue } from '../model/ligue.model';
import { Image } from '../model/image.model';
@Component({
  selector: 'app-add-equipe',
  templateUrl: './add-equipe.component.html',
})
export class AddEquipeComponent {
  ligues!: Ligue[];
  newIdLigue!: number;
  newLigue!: Ligue;
  newEquipe = new Equipe();
  ajouterAvecSucces = false;

  uploadedImage!: File;
  imagePath: any;

  constructor(private equipeService: EquipeService, private router: Router) {}

  ngOnInit(): void {
    this.equipeService.listeLigues().subscribe((ligs) => {
      this.ligues = ligs._embedded.ligues;
      console.log(ligs);
    });
  }
  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }
  /*
  addEquipe() {
    this.equipeService
      .uploadImage(this.uploadedImage, this.uploadedImage.name)
      .subscribe((img: Image) => {
      this.newEquipe.image = img;
      this.newEquipe.ligue = this.ligues.find(
        (lig) => lig.idLigue == this.newIdLigue
      )!;
      this.equipeService.ajouterEquipe(this.newEquipe).subscribe(() => {
        this.router.navigate(['equipes']);
      });
      });
  }*/
      addEquipe() {
    this.newEquipe.ligue = this.ligues.find(
      (lig) => lig.idLigue == this.newIdLigue
    )!;
    this.equipeService.ajouterEquipe(this.newEquipe).subscribe((prod) => {
      this.equipeService
        .uploadImageFS(
          this.uploadedImage,
          this.uploadedImage.name,
          prod.idEquipe
        )
        .subscribe((response: any) => {});
      this.router.navigate(['equipes']);
    });
  }
  /*
  addEquipe() {
    this.newEquipe.ligue = this.ligues.find(
      (lig) => lig.idLigue == this.newIdLigue
    )!;
    this.equipeService.ajouterEquipe(this.newEquipe).subscribe((eqip) => {
      console.log(eqip);
      this.router.navigate(['equipes']);
    });
  } */
}
