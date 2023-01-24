import { Movie } from "./Movie";

export interface Actor{
    actorName:string;
    birthday:Date;
	bloodtype:string;
    rating:number;
	comment:string;
	added:Date;
    movies:Movie[];
}