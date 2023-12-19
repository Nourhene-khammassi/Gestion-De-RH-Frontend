import { Departement } from "./rhmodel/departement";

export class RegisterRequest {
    email !: string;
    password !: string;
    fullname !: string;
    matricule!: string;
    datenaissance!: Date;
    dateembauche!: Date;
    sexeempl!: string;
    gradeempl!: string;
    departementdto!:Departement
    
   // salaire!: string;
    //role! : string [];


}
