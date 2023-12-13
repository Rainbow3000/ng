import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ComponentRedering } from '../../../services/componentRedering.service';


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
  styleUrl: './employee-action.component.scss',
})
export class EmployeeActionComponent {

  constructor(private fb : FormBuilder, private cr : ComponentRedering){
    this.componentRendering = cr.getComponentRendering; 
    this.formMode = cr.getFormMode; 
  }

  componentRendering:number;
  formMode:string; 

  educations = new FormArray<FormGroup>([])
  experiences = new FormArray<FormGroup>([]); 
  allowanceSalarys = new FormArray<FormGroup>([]); 
  deductibleSalarys = new FormArray<FormGroup>([]); 
  educationForm:FormGroup
  experienceForm: FormGroup
  allowanceSalaryForm:FormGroup
  deductibleSalaryForm:FormGroup
  handleAddForm(type:string){
    if(type === 'education'){
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
    if(type === 'experience'){
      this.experienceForm = this.fb.group({
        fromYear: 0,
        toYear: 0,
        workPlace: '',
        workPosition: '',
        personCompare: '',
        isCheckedCompare: false,
        note: ''
      });
      this.experiences.push(this.educationForm); 
    }

    if(type === 'allowenceSalary'){
      this.allowanceSalaryForm = this.fb.group({
        fromYear: 0,
        toYear: 0,
        workPlace: '',
        workPosition: '',
        personCompare: '',
        isCheckedCompare: false,
        note: ''
      });
      this.allowanceSalarys.push(this.allowanceSalaryForm); 
    }


    if(type === 'deductibleSalary'){
      this.deductibleSalaryForm = this.fb.group({
        fromYear: 0,
        toYear: 0,
        workPlace: '',
        workPosition: '',
        personCompare: '',
        isCheckedCompare: false,
        note: ''
      });
      this.deductibleSalarys.push(this.deductibleSalaryForm); 
    }
  }

  handleSetComponentRendering(value:number){
    this.cr.setComponentRendering = value; 
  }

}
