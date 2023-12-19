
import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/modules/rhmodel/employee';
import { Formation } from 'src/app/modules/rhmodel/formation';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormationService } from 'src/app/services/SERVICERH/formation.service';
import { GestiionemplService } from 'src/app/services/SERVICERH/gestiionempl.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
  idemp!:number;
  role!:string;
  datePipeString:any
  departemList:Formation[] = [];
  p: number = 1;
  departFormGroup!: FormGroup;
  departFormGroup2!: FormGroup;
  submitted:boolean = false;
  departementModel:Formation = new Formation();
  depart:Formation = new Formation() ; // used for view 
  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  @ViewChild('closeUpdateModalBtn') closeUpdateModalBtn!: ElementRef;
  employees:  Employee[] = [];
  selectedEmployee!:number[];
  constructor(private autserv:AuthService,private datePipe: DatePipe,private formBuilder : FormBuilder,private dptService: FormationService,private emplservice:GestiionemplService){}
  ngOnInit() {
   
    this.role=this.autserv.getRole()
   this.ListEmployee() 
    this.departFormGroup = new FormGroup({
   
            'nomformation' : new FormControl('', Validators.required),
            'debuformation' : new FormControl('', Validators.required),
            'finformation' : new FormControl('', Validators.required),
            'secteurformation' : new FormControl('', Validators.required),
            'lieuformation' : new FormControl('', Validators.required),
            'instructeur' : new FormControl('', Validators.required),
            'idempls' : new FormControl('', Validators.required),
    });

    this.departFormGroup2 = new FormGroup({
      'nomformation' : new FormControl('', Validators.required),
      'debuformation' : new FormControl('', Validators.required),
      'finformation' : new FormControl('', Validators.required),
      'secteurformation' : new FormControl('', Validators.required),
      'lieuformation' : new FormControl('', Validators.required),
      'instructeur' : new FormControl('', Validators.required),
      'idempls' : new FormControl('', Validators.required),
    });
    this.idemp =Number(localStorage.getItem("userId"))
    this.getdpts()
    
  }

  public getdpts(){
    this.dptService.getformationListempl(this.idemp)
    .subscribe( {
       next: ( response) => {
        this.departemList = response;
      //  console.log(this.Dpt);
      },
      
        error: (e) => console.error(e)
      
    
  });
}
deletedepartement(id:number): void {
  this.dptService.deleteformation(id)
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
 
  this.depart.nomformation = this.departFormGroup.value.nomformation;
  this.depart.debuformation = this.departFormGroup.value.debuformation;
  this.depart.finformation = this.departFormGroup.value.finformation ;
  this.depart.secteurformation = this.departFormGroup.value.secteurformation;
  this.depart.lieuformation = this.departFormGroup.value.lieuformation;
  this.depart.instructeur = this.departFormGroup.value.instructeur;
  this.depart.idempls = this.departFormGroup.value.idempls;
  

  console.log("bnj",this.depart.idempls)
    this.dptService.addDpt(this.depart)
      .subscribe({
        next: (res) => {
            this.closeModalBtn.nativeElement.click()
            this.getdpts()
              this.submitted = false ; 
              this.depart = new Formation();
              this.departFormGroup.reset();
        },
      });
      this.getdpts()
}


editDpt(dptId:number)
  {

    if(dptId!=undefined && dptId !=null)
    {
      this.dptService.finddpetById(dptId).subscribe(
        res=>{
          console.log(res);
          this.departementModel=res 
      },error=>{
        console.error(error) 
      },()=>{ 
        
        this.departFormGroup2.get("nomformation")?.setValue(this.departementModel.nomformation);
        this.departFormGroup2.get("debuformation")?.setValue(this.datePipe.transform(this.departementModel.finformation,'yyyy-MM-dd'));
        this.departFormGroup2.get("finformation")?.setValue(this.datePipe.transform(this.departementModel.finformation,'yyyy-MM-dd'));
        this.departFormGroup2.get("secteurformation")?.setValue(this.departementModel.secteurformation);
        this.departFormGroup2.get("lieuformation")?.setValue(this.departementModel.lieuformation);
        this.departFormGroup2.get("instructeur")?.setValue(this.departementModel.instructeur);
        this.departFormGroup2.get("idempls")?.setValue(this.departementModel.idempls);
       // this.departementModel.debuformation
        //this.datePipeString = this.datePipe.transform(this.departementModel.finformation,'yyyy-MM-dd');
        
        this.departFormGroup2.updateValueAndValidity()
      });
    }
  }
 ListEmployee() {
  this.emplservice.getemployeeList().subscribe({
    next: (data) => {
    
      this.employees = data
      console.log("Listeploye",this.employees)
    },
    error: (err) => {
      console.log(err)
    }
  });
  
}
    
    
  

  
}

