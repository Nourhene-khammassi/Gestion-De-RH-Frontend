import { Departement } from "./departement";

export class Employee {
   
	id!:number
	matricule!:string
	fullname!:string;
	email!:string;
	datenaissance!:Date;
	dateembauche!: Date;
	sexeempl!:string;
	gradeempl!:string;
	salaire!:string;
    departementdto!:Departement;
}
