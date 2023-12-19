import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Conge } from 'src/app/modules/rhmodel/conge';
import { GestionioncongeService } from 'src/app/services/SERVICERH/gestionionconge.service';

@Component({
  selector: 'app-demandeconge',
  templateUrl: './demandeconge.component.html',
  styleUrls: ['./demandeconge.component.css']
})
export class DemandecongeComponent implements OnInit {
idemp!:number
  departemList:Conge[] = [];
  p: number = 1;
  departFormGroup!: FormGroup;
  departFormGroup2!: FormGroup;
  submitted:boolean = false;
  departementModel:Conge = new Conge();
  depart:Conge = new Conge() ; // used for view 
  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  @ViewChild('closeUpdateModalBtn') closeUpdateModalBtn!: ElementRef;
  constructor(private formBuilder : FormBuilder,private dptService: GestionioncongeService){}
  ngOnInit() {
    this.departFormGroup = new FormGroup({
    
 
      'debuconge' : new FormControl('', Validators.required),
      'finconge' : new FormControl('', Validators.required),
      'nbrjours' : new FormControl('', Validators.required),
      'cause' : new FormControl('', Validators.required),
      'typeconge' : new FormControl('', Validators.required),
      'remplacent' : new FormControl('', Validators.required),
    });

    this.departFormGroup2 = new FormGroup({
      'debuconge' : new FormControl('', Validators.required),
      'finconge' : new FormControl('', Validators.required),
      'nbrjours' : new FormControl('', Validators.required),
      'cause' : new FormControl('', Validators.required),
      'typeconge' : new FormControl('', Validators.required),
      'remplacent' : new FormControl('', Validators.required),
      

    });
    this.idemp =Number(localStorage.getItem("userId"))
    this.getdpts()
    
  }

  public getdpts(){
    this.dptService.getcongeListempl(this.idemp)
    .subscribe( {
       next: ( response) => {
        this.departemList = response;
      //  console.log(this.Dpt);
      },
      
        error: (e) => console.error(e)
      
    
  });
}
deletedepartement(id:number): void {
  this.dptService.deletecong(id)
    .subscribe({
      next: (res) => {
        console.log(res);
        //alert("delete!!!!!")
      
      },
      error: (e) => console.error(e)
    });
    this.getdpts()
}

adddpt()
{
  
  this.submitted = true;
  if(this.departFormGroup.invalid)
  {
    alert("hhhhhhhhhh")
    return  ;
  }
  
  this.depart.debuconge = this.departFormGroup.value.debuconge;
  this.depart.finconge = this.departFormGroup.value.finconge;
  this.depart.nbrjours = this.departFormGroup.value.nbrjours;
  this.depart.cause = this.departFormGroup.value.cause;
  this.depart.typeconge = this.departFormGroup.value.typeconge;
  this.depart.remplacent = this.departFormGroup.value.remplacent;
  this.depart.isvalide = false;
  console.log(this.depart)
    this.dptService.addDpt(this.depart,this.idemp)
      .subscribe({
        next: (res) => {
            this.closeModalBtn.nativeElement.click()
            this.getdpts()
              this.submitted = false ; 
              this.depart = new Conge();
              this.departFormGroup.reset();
        },
      });
      this.getdpts()
}


editDpt(dptId:number)
  {

    if(dptId!=undefined && dptId !=null)
    {
      this.dptService.getcong(dptId).subscribe(
        res=>{
          console.log(res);
          this.departementModel=res 
      },error=>{
        console.error(error) 
      },()=>{ 
        this.departFormGroup2.get("debuconge")?.setValue(this.departementModel.debuconge);
        this.departFormGroup2.get("finconge")?.setValue(this.departementModel.finconge);
        this.departFormGroup2.get("nbrjours")?.setValue(this.departementModel.nbrjours);
        this.departFormGroup2.get("typeconge")?.setValue(this.departementModel.typeconge);
        this.departFormGroup2.get("isvalide")?.setValue(this.departementModel.isvalide);
        this.departFormGroup2.get("cause")?.setValue(this.departementModel.cause);
        this.departFormGroup2.get("remplacent")?.setValue(this.departementModel.remplacent);
        this.departFormGroup2.updateValueAndValidity()
        console.log(this.departementModel)
      });
    }
  }
 
    
    
  
  updateconge()
  {
    this.submitted = true;
    if(this.departFormGroup2.invalid)
    {
      return ;
    }
    this.departementModel.debuconge = this.departFormGroup2.value.debuconge;
    this.departementModel.finconge = this.departFormGroup2.value.finconge;
    this.departementModel.nbrjours = this.departFormGroup2.value.nbrjours;
    this.departementModel.cause = this.departFormGroup2.value.cause;
    this.departementModel.typeconge = this.departFormGroup2.value.typeconge;
    this.departementModel.remplacent = this.departFormGroup2.value.remplacent;
    






    //this.dptService.updateconge(this.departementModel)
    this.dptService.addDpt(this.departementModel,this.idemp)
    .subscribe({
      next: (res) => {
       // this.toastrService.success('Success!', 'Votre absence a été modifiée!');
        this.submitted = false ; 
        this.departementModel = new Conge();
        this.departFormGroup2.reset();
        this.closeUpdateModalBtn.nativeElement.click();
        
      },
    });
    this.getdpts()
  }

  
}
