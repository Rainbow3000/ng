import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeDto } from '../../../dtos/employeeDto';
import { ComponentRedering } from '../../../services/componentRedering.service';
import {WORK_STATUS,WORK_TYPE,GENDER,BANK,CONTRACT_TYPE,IDENTIFY_TYPE,POSITION,MANAGER,UNIT_TYPE,RELATION_TYPE,ALLOWANCE_TYPE,DEDUCTIBLE_TYPE} from '../../../enum/enum'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { FileDto } from '../../../dtos/fileDto';
import { ProvincesService } from '../../../services/provinces.service';
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent implements OnInit{

  constructor(private cr: ComponentRedering, private fb : FormBuilder, private provincesService:ProvincesService){}

  listOfData: Array<{ name: string; age: number; address: string }> = [];
  hiddenEditInfoBasic : boolean = true 
  hiddenEditInfoEmployee : boolean = true 
  hiddenEditSalaryInfo : boolean = true 
  infoBasicOpen:boolean = false
  infoEmployeeOpen:boolean = false
  infoBHXHOpen:boolean = false
  infoContractOpen:boolean = false
  infoAssetsOpen:boolean = false
  linkRender:number = 1;
  employeeUpdate:EmployeeDto;
  formMode:string;
  WORK_STATUS:any = WORK_STATUS
  WORK_TYPE:any =WORK_TYPE
  GENDER:any = GENDER
  BANK:any = BANK
  CONTRACT_TYPE:any = CONTRACT_TYPE
  IDENTIFY_TYPE:any = IDENTIFY_TYPE
  ALLOWANCE_TYPE:any = ALLOWANCE_TYPE
  DEDUCTIBLE_TYPE:any = DEDUCTIBLE_TYPE
  POSITION:any = POSITION
  MANAGER:any = MANAGER
  UNIT_TYPE:any = UNIT_TYPE
  RELATION_TYPE:any = RELATION_TYPE
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
  files:FileDto[] = []
  provinces : any[]
  districts:any[]
  wards:any[]
  provinceUpdate:string
  districtUpdate:string
  wardsUpdate:string
  ngOnInit(): void {
    this.provincesService.getProvinces().subscribe((data)=> {
      this.provinces = data;   
      // if(this.cr.getFormMode === "UPDATE"){
      //     this.districts = this.provinces.find(item => item.name === this.addressItem?.city)?.districts     
      //     this.wards = this.districts?.find(item => item.name ===this.addressItem?.district)?.wards
      // }
    });   

    this.formMode = this.cr.getFormMode; 
    if(this.formMode === "VIEW"){
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
       gender:this.employeeUpdate.gender.toString(),
       phoneNumber:this.employeeUpdate.phoneNumber,
       organEmail:this.employeeUpdate.organEmail,
       identifyType:this.employeeUpdate.identifyType.toString(),
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

  handleChangeLink(link:number){
    this.linkRender = link;
  }

  handleChangeEditInfoBasic(){
    this.hiddenEditInfoBasic = !this.hiddenEditInfoBasic;
    if(this.hiddenEditInfoBasic === false && this.infoBasicOpen === false){
      this.infoBasicOpen = true; 
    }
  }

  handleChangeEditInfoEmployee(){
    this.hiddenEditInfoEmployee = !this.hiddenEditInfoEmployee;
    if(this.hiddenEditInfoEmployee === false && this.infoEmployeeOpen === false){
      this.infoEmployeeOpen = true; 
    }
  }

  handleChangeEditSalaryInfo(){
    this.hiddenEditSalaryInfo = !this.hiddenEditSalaryInfo;
    if(this.hiddenEditSalaryInfo === false && this.infoContractOpen === false){
      this.infoContractOpen = true; 
    }
  }


  handleChangeStateInfoBasic(type:any){
    if(type === 1){
      this.infoEmployeeOpen = false;
      this.infoBHXHOpen = false;
      this.infoContractOpen = false;
      this.infoAssetsOpen = false;
      this.infoBasicOpen = true; 
      return;
    }
    this.infoBasicOpen = !this.infoBasicOpen;
  }

  handleChangeStateInfoEmployee(type:any){
    if(type === 1){
      this.infoBHXHOpen = false;
      this.infoContractOpen = false;
      this.infoAssetsOpen = false;
      this.infoBasicOpen = false; 
      this.infoEmployeeOpen = true; 
      return;
    }
    this.infoEmployeeOpen = !this.infoEmployeeOpen;
  }

  

  handleChangeStateInfoBHXH(type:any){
    if(type === 1){
      this.infoEmployeeOpen = false;
      this.infoContractOpen = false;
      this.infoAssetsOpen = false;
      this.infoBasicOpen = false;
      this.infoBHXHOpen = true;
      return;
    }
    this.infoBHXHOpen = !this.infoBHXHOpen;
  }

  handleChangeStateInfoContract(type:any){
    if(type === 1){
      this.infoEmployeeOpen = false;
      this.infoBHXHOpen = false;
      this.infoAssetsOpen = false;
      this.infoBasicOpen = false;
      this.infoContractOpen = true; 
      return;
    }
    this.infoContractOpen = !this.infoContractOpen; 
  }

  handleChangeStateInfoAssets(type:any){
    if(type === 1){
      this.infoEmployeeOpen = false;
      this.infoBHXHOpen = false;
      this.infoContractOpen = false;
      this.infoBasicOpen = false;
      this.infoAssetsOpen = true;
      return;
    }
    this.infoAssetsOpen = !this.infoAssetsOpen; 
  }

  handleChangeCity(prov:any){
    this.districts = this.provinces?.find(item => item.name === prov).districts;
}

handleChageDistrict(dis:any){
  
  this.wards = this.districts?.find(item => item.name === dis).wards
}

handleSetComponentRendering(value:number){
  this.cr.setComponentRendering = value; 
}

  
}
