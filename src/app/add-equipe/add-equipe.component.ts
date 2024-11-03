import { Component, OnInit } from '@angular/core';
import { Equipe } from '../model/equipe.model';
import { EquipeService } from '../services/equipe.service';
import { Router } from '@angular/router';
import { Ligue } from '../model/ligue.model';
import { Image } from '../model/image.model';

@Component({
  selector: 'app-add-equipe',
  templateUrl: './add-equipe.component.html',
})
export class AddEquipeComponent implements OnInit {
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
      console.log('Loaded Ligues: ', this.ligues);
    });
  }

  onImageUpload(event: any) {
    this.uploadedImage = event.target.files[0];
    console.log('Selected Image: ', this.uploadedImage);
    const reader = new FileReader();
    reader.readAsDataURL(this.uploadedImage);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    };
  }
  addEquipe() {
    console.log('Starting addEquipe process...');
    console.log('Selected Ligue ID: ', this.newIdLigue);
    console.log('Available Ligues: ', this.ligues);
  
    const selectedLigue = this.ligues.find((lig) => lig.idLigue == this.newIdLigue);
    if (!selectedLigue) {
      console.error('Ligue not found for ID: ', this.newIdLigue);
      return;
    }
  
    this.newEquipe.ligue = selectedLigue;
    console.log('New Equipe before saving: ', this.newEquipe);
  
    // First, save the Equipe
    this.equipeService.ajouterEquipe(this.newEquipe).subscribe(
      (savedEquipe) => {
        console.log('Equipe saved successfully: ', savedEquipe);
  
        // Now upload the image using the saved Equipe ID
        this.equipeService.uploadImageEqip(this.uploadedImage, this.uploadedImage.name, savedEquipe.idEquipe).subscribe(
          (img: Image) => {
            console.log('Uploaded Image: ', img);
  
            // Update the Equipe with the image
            this.newEquipe.images = [img];
            this.router.navigate(['equipes']);
          },
          (error) => {
            console.error('Error uploading image: ', error);
          }
        );
      },
      (error) => {
        console.error('Error saving Equipe: ', error);
      }
    );
  }
  
  
}
