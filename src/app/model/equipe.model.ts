import {Ligue} from './ligue.model';
import {Image} from './image.model';
export class Equipe {
    idEquipe! : number;
    nomEquipe! : string;
    rankEquipe! : number;
    dateCreation! : Date ;
    ligue! : Ligue;
    image! : Image ;
    imageStr!:string

    images!: Image[];
    }