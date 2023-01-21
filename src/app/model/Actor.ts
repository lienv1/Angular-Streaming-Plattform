import { Movie } from "./Movie";

export interface Actor{
    actorName:string;
    actorNameJap:string;
    birthday:Date;
	bloodtype:string;
	height:number;
	hip:number;
	breast:number;
	waist:number;
	ethnicity:string;
    rating:number;
	comment:string;
	added:Date;
    movies:Movie[];
}