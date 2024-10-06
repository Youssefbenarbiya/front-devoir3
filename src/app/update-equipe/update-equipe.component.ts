import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipe } from '../model/equipe.model';
import { EquipeService } from '../services/equipe.service';
import { Ligue } from '../model/ligue.model';
import { Image } from '../model/image.model';
@Component({
  selector: 'app-update-equipe',
  templateUrl: './update-equipe.component.html',
})
export class UpdateEquipeComponent implements OnInit {
  currentEquipe = new Equipe();
  ligues!: Ligue[];
  updatedLigID!: number;
  uploadedImage!: File;
  isImageUpdated: Boolean = false;
  myImage!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private equipeService: EquipeService
  ) {}
  /*
  ngOnInit(): void {
    // this.ligues = this.equipeService.listeLigues();
    //this.currentEquipe = this.equipeService.consulterEquipe(this.activatedRoute.snapshot.params['id']);
    // this.updatedLigID = this.currentEquipe.ligue.idLigue!;
    this.equipeService.listeLigues().subscribe((ligs) => {
      this.ligues = ligs._embedded.ligues;
      console.log(ligs);
    });

    this.equipeService
      .consulterEquipe(this.activatedRoute.snapshot.params['id'])
      .subscribe((eqip) => {
        this.currentEquipe = eqip;
        this.updatedLigID = eqip.ligue.idLigue;
        this.equipeService
          .loadImage(this.currentEquipe.image.idImage)
          .subscribe((img: Image) => {
            this.myImage = 'data:' + img.type + ';base64,' + img.image;
          });
      });
  }*/
  ngOnInit(): void {
    this.equipeService.listeLigues().subscribe((cats) => {
      this.ligues = cats._embedded.ligues;
    });
    this.equipeService
      .consulterEquipe(this.activatedRoute.snapshot.params['id'])
      .subscribe((eqip) => {
        this.currentEquipe = eqip;
        this.updatedLigID = eqip.ligue.idLigue;
      });
  }
  onAddImageEquipe() {
    this.equipeService
      .uploadImageEqip(
        this.uploadedImage,
        this.uploadedImage.name,
        this.currentEquipe.idEquipe
      )
      .subscribe((img: Image) => {
        this.currentEquipe.images.push(img);
      });
  }
  /*
  updateEquipe() {
    this.currentEquipe.ligue = this.ligues.find(
      (lig) => lig.idLigue == this.updatedLigID
    )!;
    this.equipeService.updateEquipe(this.currentEquipe).subscribe((e) => {
      this.router.navigate(['equipes']);
    });
  }*/
  /*
  updateEquipe() {
    this.currentEquipe.ligue = this.ligues.find(
      (lig) => lig.idLigue == this.updatedLigID
    )!; //tester si l'image du produit a été modifiée
    if (this.isImageUpdated) {
      this.equipeService
        .uploadImage(this.uploadedImage, this.uploadedImage.name)
        .subscribe((img: Image) => {
          this.currentEquipe.image = img;
          this.equipeService
            .updateEquipe(this.currentEquipe)
            .subscribe((prod) => {
              this.router.navigate(['equipes']);
            });
        });
    } else {
      this.equipeService.updateEquipe(this.currentEquipe).subscribe((prod) => {
        this.router.navigate(['equipes']);
      });
    }
  }*/
    updateEquipe() {
    this.currentEquipe.ligue = this.ligues.find(
      (lig) => lig.idLigue == this.updatedLigID
    )!;
    this.equipeService.updateEquipe(this.currentEquipe).subscribe((prod) => {
      this.router.navigate(['equipes']);
    });
  }
  onImageUpload(event: any) {
    if (event.target.files && event.target.files.length) {
      this.uploadedImage = event.target.files[0];
      this.isImageUpdated = true;
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadedImage);
      reader.onload = () => {
        this.myImage = reader.result as string;
      };
    }
  }
  supprimerImage(img: Image){
     let conf = confirm("Etes-vous sûr ?"); 
     if (conf) this.equipeService.supprimerImage(img.idImage)
      .subscribe(() => { 
    //supprimer image du tableau currentEquipe.images 
    const index = this.currentEquipe.images.indexOf(img, 0);
     if (index > -1) { this.currentEquipe.images.splice(index, 1); } }); }
}
