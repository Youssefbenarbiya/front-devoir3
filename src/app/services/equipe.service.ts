import { Injectable } from '@angular/core';
import { Equipe } from '../model/equipe.model';
import { Ligue } from '../model/ligue.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LigueWrapper } from '../model/LigueWrapped.model';
import { AuthService } from './auth.service';
import { Image } from '../model/image.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Ligue': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class EquipeService {
  apiURL: string = 'http://localhost:8090/equipes/api';
  apiURLLig: string = 'http://localhost:8090/equipes/ligue';

  constructor(private http: HttpClient, public authService: AuthService) {}

  listeEquipes(): Observable<Equipe[]> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Equipe[]>(this.apiURL + '/all', {
      headers: httpHeaders,
    });
  }

  listeLigues(): Observable<LigueWrapper> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<LigueWrapper>(this.apiURLLig, {
      headers: httpHeaders,
    });
  }

  ajouterEquipe(eqip: Equipe): Observable<Equipe> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post<Equipe>(this.apiURL + '/addeqip', eqip, {
      headers: httpHeaders,
    });
  }

  supprimerEquipe(id: number) {
    const url = `${this.apiURL}/deleqip/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterEquipe(id: number): Observable<Equipe> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Equipe>(url, { headers: httpHeaders });
  }

  updateEquipe(eqip: Equipe): Observable<Equipe> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.put<Equipe>(this.apiURL + '/updateeqip', eqip, {
      headers: httpHeaders,
    });
  }

  rechercherParLigue(idLigue: string): Observable<Equipe[]> {
    const url = `${this.apiURL}/equipeLig/${idLigue}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Equipe[]>(url, { headers: httpHeaders });
  }

  rechercherParNom(nom: string): Observable<Equipe[]> {
    const url = `${this.apiURL}/eqipByName/${nom}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Equipe[]>(url, { headers: httpHeaders });
  }

  ajouteLigue(type: Ligue): Observable<Ligue> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post<Ligue>(this.apiURLLig, type, {
      headers: httpHeaders,
    });
  }

  supprimerLigue(id: number) {
    const url = `${this.apiURLLig}/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.delete(url, { headers: httpHeaders });
  }

  updateLigue(lig: Ligue): Observable<Ligue> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    const url = `${this.apiURLLig}/${lig.idLigue}`;
    return this.http.put<Ligue>(url, lig, { headers: httpHeaders });
  }





  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
  
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    const httpHeaders = new HttpHeaders({ 
      'Authorization': jwt 
    });
  
    const url = `${this.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData, { headers: httpHeaders });
  }
  


loadImage(id: number): Observable<Image> {
  let jwt = this.authService.getToken();
  jwt = 'Bearer ' + jwt;
  const httpHeaders = new HttpHeaders({ 
    'Authorization': jwt 
  });

  const url = `${this.apiURL + '/image/get/info'}/${id}`;
  return this.http.get<Image>(url, { headers: httpHeaders });
}

uploadImageEqip(
  file: File,
  filename: string,
  idEqip: number
): Observable<any> {
  let jwt = this.authService.getToken();
  jwt = 'Bearer ' + jwt;
  const httpHeaders = new HttpHeaders({ 
    'Authorization': jwt 
  });

  const imageFormData = new FormData();
  imageFormData.append('image', file, filename);
  const url = `${this.apiURL + '/image/uploadImageEqip'}/${idEqip}`;
  return this.http.post(url, imageFormData, { headers: httpHeaders });
}


supprimerImage(id: number): Observable<void> {
  let jwt = this.authService.getToken();
  jwt = 'Bearer ' + jwt;
  const httpHeaders = new HttpHeaders({ 
    'Authorization': jwt 
  });

  const url = `${this.apiURL}/image/delete/${id}`;
  return this.http.delete<void>(url, { headers: httpHeaders });
}


}