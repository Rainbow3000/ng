import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';


interface IEducation{
  fromYear:number,
  toYear:number,
  educationPlace:string,
  specialized:string,
  degree:string,
  classification:string,
  graduationYear:number
}


@Component({
  selector: 'app-employee-action',
  templateUrl: './employee-action.component.html',
  styleUrl: './employee-action.component.scss'
})
export class EmployeeActionComponent {

  constructor(private fb : FormBuilder){

  }

  educations = new FormArray<FormGroup>([])
  educationForm:FormGroup

  handleAddForm(){
    this.educationForm = this.fb.group({
      fromYear: 0,
      toYear: 0,
      educationPlace: '',
      specialized: '',
      degree: '',
      classification: '',
      graduationYear: 0
    });
    this.educations.push(this.educationForm); 
  }

}
