import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Output, EventEmitter  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { University } from './university';
import { UniversityService } from './university.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public universities: University[]=[];
  public editUniversity!: University|null;
  //public deleteUniversity!: University|null|number|any;   //remove null and others except university
  @Input() universityId!:University;
  @Output() deleteUniversity:EventEmitter<University> = new EventEmitter();
  title: any;

  constructor(private universityService: UniversityService) { }

  ngOnInit(): void {
    this.getUniversities();
  }

  OnDeleteUniversity(universityId:University): void{
    this.deleteUniversity.emit(universityId);
    console.log(universityId);
  }

  public getUniversities(): void{
    this.universityService.getUniversities().subscribe(
      (response: University[])=>{
        this.universities=response;
        console.log(this.universities);
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }

  public onAddUniversity(addForm: NgForm): void{
    document.getElementById('add-university-form')?.click();
    this.universityService.addUniversity(addForm.value).subscribe(
      (response: University)=>{
        console.log(response);
        this.getUniversities();
        addForm.reset();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateUniversity(university: University): void{
    this.universityService.updateUniversity(university).subscribe(
      (response: University)=>{
        console.log(response);
        this.getUniversities();
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }

  // public onDeleteUniversity(universityId: number): void{
  //   this.universityService.deleteUniversity(universityId).subscribe(
  //     (response: void)=>{
  //       console.log(response);
  //       this.getUniversities();
  //     },
  //     (error: HttpErrorResponse)=>{
  //       alert(error.message);
  //     }
  //   );
  // }

  public searchUniversities(key:string): void{
    console.log(key);
    const results: University[]=[];
    for(const university of this.universities){
      if(university.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || university.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || university.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || university.location.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(university);
      }
    }
    this.universities=results;
    if(results.length === 0 || !key) {
      this.getUniversities();
    }
  }
  
  public onOpenModal(university: University|null,mode: string): void{    //remove null
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode === 'add'){
      button.setAttribute('data-target','#addUniversityModal');
    }
    if(mode === 'edit'){
      this.editUniversity=university;
      button.setAttribute('data-target','#updateUniversityModal');
    }
    if(mode === 'delete'){
      //this.deleteUniversity=university;
      const index=this.universities.indexOf(this.universityId);
      this.universities.splice(index,1);
      button.setAttribute('data-target','#deleteUniversityModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
