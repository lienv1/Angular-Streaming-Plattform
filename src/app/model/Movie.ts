import { Participant } from "./participant";
import { Genre } from "./genre";

export interface Movie{
    movieID:string;
    titel:string;
    released:Date;
    length:number;
    director:string;
    maker:string;
    label:string;
    rating:number;
    comment:string;
    added:Date;
    actors:Participant[];
    genres:Genre[];
}