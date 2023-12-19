import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Conge } from 'src/app/modules/rhmodel/conge';
import { Employee } from 'src/app/modules/rhmodel/employee';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GestiionemplService } from 'src/app/services/SERVICERH/gestiionempl.service';
import { GestionioncongeService } from 'src/app/services/SERVICERH/gestionionconge.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  //idemp!:number
 emplList:Conge[] = [];
  entityList:any
 // Employee[] = [];
  p: number = 1;
  entityFormGroup!: FormGroup;
  entityFormGroup2!: FormGroup;
  submitted:boolean = false;
  entityModel:Employee = new Employee();
  entity:Employee = new Employee() ; // used for view 
  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  @ViewChild('closeUpdateModalBtn') closeUpdateModalBtn!: ElementRef;
  role!:string;
  //this.role=this.autserv.getRole()
  constructor(private autserv:AuthService,private formBuilder : FormBuilder,private emplService: GestiionemplService,private dptService: GestionioncongeService){}

  ngOnInit() {
    
    this.role=this.autserv.getRole()

      this.entityFormGroup = new FormGroup({
        ///  'iddept' : new FormControl('', Validators.required),
          'fullname' : new FormControl('', Validators.required),
          'email' : new FormControl('', Validators.required),
          'datenaissance' : new FormControl('', Validators.required),
          'dateembauche' : new FormControl('', Validators.required),
          'sexeempl' : new FormControl('', Validators.required),
          'gradeempl' : new FormControl('', Validators.required),
          'salaire' : new FormControl('', Validators.required),
          'departementdto' : new FormControl('', Validators.required),
        });

        this.entityFormGroup2 = new FormGroup({
          'fullname' : new FormControl('', Validators.required),
          'email' : new FormControl('', Validators.required),
          'datenaissance' : new FormControl('', Validators.required),
          'dateembauche' : new FormControl('', Validators.required),
          'sexeempl' : new FormControl('', Validators.required),
          'gradeempl' : new FormControl('', Validators.required),
          'salaire' : new FormControl('', Validators.required),
          'departementdto' : new FormControl('', Validators.required),
   
          
    
        });
    this.getliste();  
  }
//| date:"dd/MM/yyyy
  public getliste(){
    this.emplService.getemployeeList()
    .subscribe( {
       next: ( response) => {
        this.entityList = response;
       console.log(this.entityList);
      },
      
        error: (e) => console.error(e)
      
    
  });
}
deleteemployee(id:number): void {
  this.emplService.deleteEmployee(id)
    .subscribe({
      next: (res) => {
        console.log(res);
        alert("delete!!!!!")
        this.getliste();
      },
      error: (e) => console.error(e)
    });
}

getentitybyid(Id:number)
  {

    if(Id!=undefined && Id !=null)
    {
      this.emplService.getemployee(Id).subscribe(
        res=>{
          console.log(res);
          this.entityModel=res 
      },error=>{
        console.error(error) 
      },()=>{ 
         
        this.entityFormGroup2.get("fullname")?.setValue(this.entityModel.fullname);
        this.entityFormGroup2.get("email")?.setValue(this.entityModel.email);
        this.entityFormGroup2.get("datenaissance")?.setValue(this.entityModel.datenaissance );
        this.entityFormGroup2.get("dateembauche")?.setValue(this.entityModel.dateembauche);
        this.entityFormGroup2.get("sexeempl")?.setValue(this.entityModel.sexeempl);
        this.entityFormGroup2.get("gradeempl")?.setValue(this.entityModel.gradeempl);
        this.entityFormGroup2.get("salaire")?.setValue(this.entityModel.salaire);
        this.entityFormGroup2.get("departementdto.namedpt")?.setValue(this.entityModel.departementdto.namedpt);
        
        this.entityFormGroup2.updateValueAndValidity()
      });
    }
  }
  /*
getbyidempl(id : number) {
  this.emplService.getemployee(id)
    .subscribe({
      next: (res) => {
        this.dptObj=res
        console.log(res);
       // alert("delete!!!!!")
       
      },
      error: (e) => console.error(e)
    });

}*/

/*updateDpt() {

 // this.empObj.id = this.empDetail.value.id;
  this.dptObj.namedpt = this.dptDetail.value.name_Dpt;
  //this.empObj.salary = this.empDetail.value.salary;
  //this.empObj.email = this.empDetail.value.email;

  this.dptService.updateDpt(this.dptObj).subscribe(res=>{
    console.log(res);
    this.getdpts();
  },err=>{
    console.log(err);
  })

}*/
 
public getlesconge(idemp:number){
  this.dptService.getcongeListempl(idemp)
  .subscribe( {
     next: ( response) => {
      this.emplList = response;
    console.log(this.emplList);
    },
    
      error: (e) => console.error(e)
    
  
});
}
public validationcongeS(id:number,isva:boolean){
  this.dptService.validationconge(id,isva)
  .subscribe( {
     next: ( response) => {
     // this.emplList = response;
    console.log(this.emplList);
    },
    
      error: (e) => console.error(e)
    
  
});
}
  

  
}
