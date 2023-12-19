import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Commentaire } from 'src/app/modules/rhmodel/commentaire';
import { Employee } from 'src/app/modules/rhmodel/employee';
import { Noteservice } from 'src/app/modules/rhmodel/noteservice';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GestiionemplService } from 'src/app/services/SERVICERH/gestiionempl.service';
import { NotserviService } from 'src/app/services/SERVICERH/notservi.service';

@Component({
  selector: 'app-noteservice',
  templateUrl: './noteservice.component.html',
  styleUrls: ['./noteservice.component.css']
})
export class NoteserviceComponent implements OnInit {
  idemp!:number;
  idpost!:number;

  commentList:Commentaire[] = [];
  role!:string;
  datePipeString:any
  departemList:Noteservice[] = [];
  myDate:Date = new Date();
  p: number = 1;
  departFormGroup!: FormGroup;
  departFormGroup2!: FormGroup;
  departFormGroup3!: FormGroup;
  submitted:boolean = false;
  entityModel:Employee = new Employee();
  departementModel:Noteservice = new Noteservice();
  depart:Noteservice = new Noteservice() ; 
  
  departcom:Commentaire = new Commentaire() ; 
  
  // used for view 
  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  @ViewChild('closeUpdateModalBtn') closeUpdateModalBtn!: ElementRef;
  nots:  Noteservice[] = [];
  selectedEmployee!:number[];
  constructor(private emplService: GestiionemplService,private autserv:AuthService,private datePipe: DatePipe,private formBuilder : FormBuilder,private dptService: NotserviService){}
  ngOnInit() {
    this.idemp =Number(localStorage.getItem("userId"))
    //this.getentitybyid(this.idemp)
    this.role=this.autserv.getRole()
   this.getdpts() 
    this.departFormGroup = new FormGroup({
    
            'nomPost' : new FormControl('', Validators.required),
            'description' : new FormControl('', Validators.required),
            'dateAjout' : new FormControl('', Validators.required),
    });

    this.departFormGroup2 = new FormGroup({
      'nomPost' : new FormControl('', Validators.required),
      'description' : new FormControl('', Validators.required),
      'dateAjout' : new FormControl('', Validators.required),
    });
    
    
    
       // this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.departFormGroup3 = new FormGroup({
      'comments' : new FormControl('', Validators.required),
     // 'dateAjout' : new FormControl('', Validators.required),
    });
   
   
    this.idemp =Number(localStorage.getItem("userId"))
    this.getdpts()
    
  }

  public getdpts(){
    this.dptService.getlistnot()
    .subscribe( {
       next: ( response) => {
        this.departemList = response;
      //  console.log(this.Dpt);
      },
      
        error: (e) => console.error(e)
      
    
  });
}
deletedepartement(id:number): void {
  this.dptService.deleteposte(id)
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
 
  this.depart.nomPost = this.departFormGroup.value.nomPost;
  this.depart.description = this.departFormGroup.value.description;
  this.depart.dateAjout = this.departFormGroup.value.dateAjout;
  console.log("")
    this.dptService.addDpt(this.depart,this.idemp )
      .subscribe({
        next: (res) => {
            this.closeModalBtn.nativeElement.click()
            this.getdpts()
              this.submitted = false ; 
              this.depart = new Noteservice();
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
        
        this.departFormGroup2.get("nomPost")?.setValue(this.departementModel.nomPost);
        this.departFormGroup2.get("description")?.setValue(this.departementModel.description);
        this.departFormGroup2.get("dateAjout")?.setValue(this.departementModel.dateAjout);
        
        this.departFormGroup2.updateValueAndValidity()
      });
    }
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
         
       
      });
    }
  }
  recupidpost(idpo:number)
  {
    this.idpost=idpo;
    
  }
  public getlescommt(idpost:number){
    this.dptService.getlistcomt(idpost)
    .subscribe( {
       next: ( response) => {
        this.commentList = response;
      console.log(this.commentList);
      },
      
        error: (e) => console.error(e)
      
    
  });
  }
  addcommentair()
  {
    
    this.submitted = true;
    if(this.departFormGroup3.invalid)
    {
      alert("hhhhhhhhhh")
      return  ;
    }
   
    this.departcom.comments = this.departFormGroup3.value.comments;
    this.departcom.dateAjout = new Date()
    console.log("")
      this.dptService.addcom(this.departcom,this.idpost,this.idemp )
        .subscribe({
          next: (res) => {
              this.closeModalBtn.nativeElement.click()
              //this.getdpts()
                this.submitted = false ; 
                this.departcom = new Commentaire();
                this.departFormGroup3.reset();
          },
        });
        this.getdpts()
  }
  








  
}


