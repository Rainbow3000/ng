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
      id:'',
      code:'',
      fullName:'',
      dob:'',
      gender:'',
      phoneNumber:'',
      organEmail:'',
      identifyType:'',
      identifyNumber:'',
      identifyDateRange:'',
      identifyIssuedBy:'',
      taxtCode:'',
      taxtCodeDateRange:'',
      taxtCodeIssuedBy:'',
      personalEmail:'',
      bank:'',
      bankAccount:'',
      createdBy:'',
      modifiedBy:'',
      workInfoDto: this.fb.group({
          employeeId:'',
          positionId:'',
          unitId:'',
          managerId:'',
          status:'',
          contractType:'',
          workType:'',
          timeKeeperCode:'',
          isExemptTimeKeeper:false,
          googleCalendarId:'',
          createdBy:'',
          modifiedBy:''
      }),
      educationDto:this.educations,
      experienceDto:this.experiences,
      fileDto:[],
      permanentResidenceDto:this.fb.group({
          employeeId:'',
          city:'',
          district:'',
          wards:'',
          houseNumber:'',
          createdBy:'',
          modifiedBy:''
      }),

      nowAddressDto:this.fb.group({
          employeeId:'',
          city:'',
          district:'',
          wards:'',
          houseNumber:'',
          createdBy:'',
          modifiedBy:''
      }),
      hometownDto:this.fb.group({
          employeeId:'',
          city:'',
          district:'',
          wards:'',
          houseNumber:'',
          createdBy:'',
          modifiedBy:''
      }),
      urgentContactDto:this.fb.group({
          employeeId:'',
          fullName:'',
          relational:'',
          phoneNumber:'',
          createdBy:'',
          modifiedBy:''
      }),
      salaryInfoDto:this.fb.group({
          employeeId:'',
          levelSalary:'',
          grossSalary:'',
          netSalary:'',
          basicSalary:'',
          insuranceSalary:'',
          totalSalary:'',
          createdBy:'',
          modifiedBy:''
      }),
      allowanceSalaryDto:this.allowanceSalarys,

      deductibleSalaryDto:this.deductibleSalarys
     })


     const salaryInfo = this.employeeForm.get('salaryInfoDto'); 
     salaryInfo?.valueChanges.subscribe((x)=>{
        this.formater(x); 
     })
  }

  errorsMessage = {
    employeeCode:"sadf",
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

  get getFileDto():any{
    return this.employeeForm.get('fileDto')
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
        employeeId:'',
        allowanceName:'',
        value:'',
        createdBy:'',
        modifiedBy:''     
      });
      this.allowanceSalarys.push(this.allowanceSalaryForm); 
    }


    if(type === 'deductibleSalary'){
      this.deductibleSalaryForm = this.fb.group({
        employeeId:'',
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

    console.log('142145');
    

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

    this.employeeService.createEmployee(this.employeeForm.value).subscribe(data =>{
      console.log(data);
    })
    

  }

}
