import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Departement } from 'src/app/modules/rhmodel/departement';
import { DepartementService } from 'src/app/services/SERVICERH/departement.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit {
  departemList:Departement[] = [];
  p: number = 1;
  departFormGroup!: FormGroup;
  departFormGroup2!: FormGroup;
  submitted:boolean = false;
  departementModel:Departement = new Departement();
  depart:Departement = new Departement() ; // used for view 
  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  @ViewChild('closeUpdateModalBtn') closeUpdateModalBtn!: ElementRef;
  constructor(private formBuilder : FormBuilder,private dptService: DepartementService){}
  ngOnInit() {
    this.departFormGroup = new FormGroup({
    ///  'iddept' : new FormControl('', Validators.required),
      'namedpt' : new FormControl('', Validators.required),
    });

    this.departFormGroup2 = new FormGroup({
      'iddept' : new FormControl('', Validators.required),
      'namedpt' : new FormControl('', Validators.required),
      

    });
    this.getdpts()
  }

  public getdpts(){
    this.dptService.getlistdpt()
    .subscribe( {
       next: ( response) => {
        this.departemList = response;
      //  console.log(this.Dpt);
      },
      
        error: (e) => console.error(e)
      
    
  });
}
deletedepartement(id:number): void {
  this.dptService.deleteEmployee(id)
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
 
  this.depart.namedpt = this.departFormGroup.value.namedpt;
  console.log(this.depart)
    this.dptService.addDpt(this.depart)
      .subscribe({
        next: (res) => {
            this.closeModalBtn.nativeElement.click()
            this.getdpts()
              this.submitted = false ; 
              this.depart = new Departement();
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
        
        this.departFormGroup2.get("namedpt")?.setValue(this.departementModel.namedpt);
        
        this.departFormGroup2.updateValueAndValidity()
      });
    }
  }
 
    
    
  

  
}
