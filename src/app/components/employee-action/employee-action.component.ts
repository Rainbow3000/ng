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



  errorsMessage = {
    employeeCode:"",
    fullName:"",
    phoneNumber:""
  }
  userNameUpdate:string
  employeeUpdate:EmployeeDto
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

  constructor(private fb : FormBuilder, private cr : ComponentRedering, private employeeService:EmployeeService){
  
  }
  formater(inputNumberValue:number){
    return `${inputNumberValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
  
  ngOnInit(): void {
      this.componentRendering = this.cr.getComponentRendering; 
      this.formMode = this.cr.getFormMode; 
      this.userNameUpdate = this.cr.getUserNameUpdate;
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
          city:null,
          district:null,
          wards:null,
          houseNumber:null,
      }),

      nowAddressDto:this.fb.group({         
          city:null,
          district:null,
          wards:null,
          houseNumber:null,
      }),
      hometownDto:this.fb.group({        
          city:null,
          district:null,
          wards:null,
          houseNumber:null,
      }),
      urgentContactDto:this.fb.group({      
          fullName:null,
          relational:null,
          phoneNumber:null,
      }),
      salaryInfoDto:this.fb.group({         
          levelSalary:null,
          grossSalary:0,
          netSalary:0,
          basicSalary:0,
          insuranceSalary:0,
          totalSalary:0
      }),
      allowanceSalaryDtos:this.allowanceSalarys,
      deductibleSalaryDtos:this.deductibleSalarys
     })

     if(this.formMode === "UPDATE"){
       this.employeeUpdate = this.cr.getEmployeeUpdate;
       if(this.employeeUpdate?.educationDtos?.length > 0){
        this.employeeUpdate.educationDtos.forEach(item =>{
          this.educationForm = this.fb.group({
            fromYear: item.fromYear,
            toYear: item.toYear,
            educationPlace: item.educationPlace,
            specialized: item.specialized,
            degree: item.degree,
            classification: item.classification,
            graduationYear: item.graduationYear
          });
          this.educations.push(this.educationForm); 
        })
       }

       if(this.employeeUpdate?.experienceDtos?.length > 0){
        this.employeeUpdate.experienceDtos.forEach(item =>{
            this.experienceForm = this.fb.group({
              fromDay:item.fromDay,
              toDay:item.toDay,
              workPlace:item.workPlace,
              workPosition:item.workPosition,
              comparePerson:item.comparePerson,
              isCheckedCompare:item.isCheckedCompare,
              note:item.note,
            });
            this.experiences.push(this.experienceForm); 
        })
       }

       if(this.employeeUpdate?.allowanceSalaryDtos?.length > 0){
        this.employeeUpdate.allowanceSalaryDtos.forEach(item =>{
            this.allowanceSalaryForm = this.fb.group({
              allowanceName:item.allowanceName,
              value:item.value,
            });
            this.allowanceSalarys.push(this.allowanceSalaryForm); 
        })
       }

       if(this.employeeUpdate?.deductibleSalaryDtos?.length > 0){
        this.employeeUpdate.deductibleSalaryDtos.forEach(item =>{
            this.deductibleSalaryForm = this.fb.group({
              deductibleName:item.deductibleName,
              value:item.value,
            });
            this.deductibleSalarys.push(this.deductibleSalaryForm); 
        })
       }
       
       this.employeeForm = this.fb.group({
        code:this.employeeUpdate.code,
        fullName:this.employeeUpdate.fullName,
        dob:this.employeeUpdate.dob,
        gender:this.employeeUpdate.gender,
        phoneNumber:this.employeeUpdate.phoneNumber,
        organEmail:this.employeeUpdate.organEmail,
        identifyType:this.employeeUpdate.identifyType,
        identifyNumber:this.employeeUpdate.identifyNumber,
        identifyDateRange:this.employeeUpdate.identifyDateRange,
        identifyIssuedBy:this.employeeUpdate.identifyIssuedBy,
        taxtCode:this.employeeUpdate.taxtCode,
        taxtCodeDateRange:this.employeeUpdate.taxtCodeDateRange,
        taxtCodeIssuedBy:this.employeeUpdate.taxtCodeIssuedBy,
        personalEmail:this.employeeUpdate.personalEmail,
        bank:this.employeeUpdate.bank.toString(),
        bankAccount:this.employeeUpdate.bankAccount,
        workInfoDto: this.fb.group({
          positionId:this.employeeUpdate.workInfoDto.positionId,
          unitId:this.employeeUpdate.workInfoDto.unitId,
          managerId:this.employeeUpdate.workInfoDto.managerId,
          status:this.employeeUpdate.workInfoDto.status.toString(),
          contractType:this.employeeUpdate.workInfoDto.contractType.toString(),
          workType:this.employeeUpdate.workInfoDto.workType.toString(),
          timeKeeperCode:this.employeeUpdate.workInfoDto.timeKeeperCode,
          isExemptTimeKeeper:this.employeeUpdate.workInfoDto.isExemptTimeKeeper,
          googleCalendarId:this.employeeUpdate.workInfoDto.googleCalendarId,
        }),
        educationDtos:this.educations,
        experienceDtos:this.experiences,
        fileDtos:[null],
        permanentResidenceDto:this.fb.group({
          city:this.employeeUpdate.permanentResidenceDto.city,
          district:this.employeeUpdate.permanentResidenceDto.district,
          wards:this.employeeUpdate.permanentResidenceDto.wards,
          houseNumber:this.employeeUpdate.permanentResidenceDto.houseNumber,
        }),
  
        nowAddressDto:this.fb.group({
          city:this.employeeUpdate.nowAddressDto.city,
          district:this.employeeUpdate.nowAddressDto.district,
          wards:this.employeeUpdate.nowAddressDto.wards,
          houseNumber:this.employeeUpdate.nowAddressDto.houseNumber,
        }),
        hometownDto:this.fb.group({
          city:this.employeeUpdate.hometownDto.city,
          district:this.employeeUpdate.hometownDto.district,
          wards:this.employeeUpdate.hometownDto.wards,
          houseNumber:this.employeeUpdate.hometownDto.houseNumber,
        }),
        urgentContactDto:this.fb.group({
          fullName:this.employeeUpdate.urgentContactDto.fullName,
          relational:this.employeeUpdate.urgentContactDto.relational,
          phoneNumber:this.employeeUpdate.urgentContactDto.phoneNumber,
        }),
        salaryInfoDto:this.fb.group(this.employeeUpdate.salaryInfoDto),
        
        allowanceSalaryDtos:this.allowanceSalarys,
        deductibleSalaryDtos:this.deductibleSalarys
       })
     }

     const salaryInfo = this.employeeForm.get('salaryInfoDto'); 
     salaryInfo?.valueChanges.subscribe((x)=>{
        this.formater(x);  
        const formControl = salaryInfo.get('totalSalary'); 
        const {basicSalary,grossSalary,netSalary,insuranceSalary } = salaryInfo.value; 
        const total = basicSalary + grossSalary + netSalary + insuranceSalary; 
        formControl?.patchValue(total ,{emitEvent: false})
     })
  }

  caculateSalary(){
    const salary = this.getSalaryInfoDto.value; 
    return 123
  }

  
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
        allowanceName:'',
        value:'',
        createdBy:'',
        modifiedBy:''     
      });
      this.allowanceSalarys.push(this.allowanceSalaryForm); 
    }


    if(type === 'deductibleSalary'){
      this.deductibleSalaryForm = this.fb.group({
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

    if(this.employeeForm.value.phoneNumber.trim().length === 0){
      this.errorsMessage.phoneNumber = "Số điện thoại không được để trống"
      flag = 1;
    }

    if(flag === 1) return;
    let employeeCreateDto = this.employeeForm.value
    employeeCreateDto.workInfoDto.status = parseInt(employeeCreateDto.workInfoDto.status); 
    employeeCreateDto.workInfoDto.contractType = parseInt(employeeCreateDto.workInfoDto.contractType); 
    employeeCreateDto.workInfoDto.workType = parseInt(employeeCreateDto.workInfoDto.workType); 
    employeeCreateDto.identifyType = parseInt(employeeCreateDto.identifyType); 
    employeeCreateDto.gender = parseInt(employeeCreateDto.gender); 
    employeeCreateDto.bank = parseInt(employeeCreateDto.bank)
    if(employeeCreateDto.organEmail?.trim().length === 0){
      employeeCreateDto.organEmail = null; 
    }

    if(employeeCreateDto.personalEmail?.trim().length === 0){
      employeeCreateDto.personalEmail = null; 
    }

    if(this.formMode === "UPDATE"){
      this.employeeService.updateEmployee(this.employeeUpdate?.employeeId,employeeCreateDto).subscribe(data =>{
        this.handleSetComponentRendering(1);
        return; 
    })
    }

    this.employeeService.createEmployee(employeeCreateDto).subscribe(data =>{
        this.handleSetComponentRendering(1);
    })
    
  }

}
