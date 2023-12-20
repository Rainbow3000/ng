import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ComponentRedering } from '../../../services/componentRedering.service';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeDto } from '../../../dtos/employeeDto';


@Component({
  selector: 'app-employee-action',
  templateUrl: './employee-action.component.html',
  styleUrl: './employee-action.component.scss',
})
export class EmployeeActionComponent implements OnInit {

  constructor(private fb : FormBuilder, private cr : ComponentRedering, private employeeService:EmployeeService){
    this.componentRendering = cr.getComponentRendering; 
    this.formMode = cr.getFormMode; 
  }
  formater(inputNumberValue:number){
    return `${inputNumberValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  
  ngOnInit(): void {
      this.employeeForm = this.fb.group({
      code:'',
      fullName:'',
      dob:null,
      gender:null,
      phoneNumber:'',
      organEmail:null,
      identifyType:null,
      identifyNumber:null,
      identifyDateRange:null,
      identifyIssuedBy:null,
      taxtCode:null,
      taxtCodeDateRange:null,
      taxtCodeIssuedBy:null,
      personalEmail:null,
      bank:null,
      bankAccount:null,
      workInfoDto: this.fb.group({
          // employeeId:null,
          positionId:null,
          unitId:null,
          managerId:null,
          status:null,
          contractType:null,
          workType:null,
          timeKeeperCode:null,
          isExemptTimeKeeper:false,
          googleCalendarId:null,
      }),
      educationDtos:this.educations,
      experienceDtos:this.experiences,
      fileDtos:[null],
      permanentResidenceDto:this.fb.group({
          // employeeId:null,
          city:null,
          district:null,
          wards:null,
          houseNumber:null,
      }),

      nowAddressDto:this.fb.group({
          // employeeId:null,
          city:null,
          district:null,
          wards:null,
          houseNumber:null,
      }),
      hometownDto:this.fb.group({
          // employeeId:null,
          city:null,
          district:null,
          wards:null,
          houseNumber:null,
      }),
      urgentContactDto:this.fb.group({
          // employeeId:null,
          fullName:null,
          relational:null,
          phoneNumber:null,
      }),
      salaryInfoDto:this.fb.group({
          // employeeId:null,
          levelSalary:null,
          grossSalary:null,
          netSalary:null,
          basicSalary:null,
          insuranceSalary:null,
          totalSalary:null,
      }),
      allowanceSalaryDtos:this.allowanceSalarys,

      deductibleSalaryDtos:this.deductibleSalarys
     })


     const salaryInfo = this.employeeForm.get('salaryInfoDto'); 
     salaryInfo?.valueChanges.subscribe((x)=>{
        this.formater(x); 
     })
  }

  errorsMessage = {
    employeeCode:"",
    fullName:"",
    phoneNumber:""
  }

  componentRendering:number;
  formMode:string;
  inputValue: string | null = null;
  textValue: string | null = null;
  educations = new FormArray<FormGroup>([])
  experiences = new FormArray<FormGroup>([]); 
  allowanceSalarys = new FormArray<FormGroup>([]); 
  deductibleSalarys = new FormArray<FormGroup>([]); 
  experienceForm: FormGroup
  allowanceSalaryForm:FormGroup
  deductibleSalaryForm:FormGroup
  workInfoForm:FormGroup
  educationForm:FormGroup
  employeeForm:FormGroup

  
  get getWorkInfoDto():any{
    return this.employeeForm.get('workInfoDto')
  }

  get getPermanentResidenceDto():any{
    return this.employeeForm.get('permanentResidenceDto')
  }

  get getNowAddressDto():any{
    return this.employeeForm.get('nowAddressDto')
  }


  get getHometownDto():any{
    return this.employeeForm.get('hometownDto')
  }

  get getUrgentContactDto():any{
    return this.employeeForm.get('urgentContactDto')
  }

  get getSalaryInfoDto():any{
    return this.employeeForm.get('salaryInfoDto')
  }

  get getFileDto():any{
    return this.employeeForm.get('fileDtos')
  }


  handleAddForm(type:string){
    if(type === 'education'){
      this.educationForm = this.fb.group({
        fromYear: '',
        toYear: '',
        educationPlace: '',
        specialized: '',
        degree: '',
        classification: '',
        graduationYear: ''
      });
      this.educations.push(this.educationForm); 
    }
    if(type === 'experience'){
      this.experienceForm = this.fb.group({
        fromYear: '',
        toYear: '',
        workPlace: '',
        workPosition: '',
        personCompare: '',
        isCheckedCompare: false,
        note: ''
      });
      this.experiences.push(this.experienceForm); 
    }

    if(type === 'allowenceSalary'){
      this.allowanceSalaryForm = this.fb.group({
        // employeeId:'',
        allowanceName:'',
        value:'',
        createdBy:'',
        modifiedBy:''     
      });
      this.allowanceSalarys.push(this.allowanceSalaryForm); 
    }


    if(type === 'deductibleSalary'){
      this.deductibleSalaryForm = this.fb.group({
        // employeeId:'',
        deductibleName:'',
        value:'',
        createdBy:'',
        modifiedBy:''
      });
      this.deductibleSalarys.push(this.deductibleSalaryForm); 
    }
  }

  handleSetComponentRendering(value:number){
    this.cr.setComponentRendering = value; 
  }

  handleSaveForm(){
    let flag = 0;  
    if(this.employeeForm.value.code.trim().length === 0){
      this.errorsMessage.employeeCode = "Mã nhân viên không được để trống"
      flag = 1;
    }

    if(this.employeeForm.value.fullName.trim().length === 0){
      this.errorsMessage.fullName = "Tên không được để trống"
      flag = 1;
    }

    if(this.employeeForm.value.code.trim().length === 0){
      this.errorsMessage.phoneNumber = "Số điện thoại không được để trống"
      flag = 1;
    }

    if(flag === 1) return;
    let employeeCreateDto = this.employeeForm.value
    this.employeeService.createEmployee(employeeCreateDto).subscribe(data =>{
      console.log(data);
    })
    

  }

}
