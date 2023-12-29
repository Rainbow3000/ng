import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  inputValue: string | null = null;
  textValue: string | null = null;
  employeeForm:FormGroup
  constructor(private fb:FormBuilder, private employeeService:EmployeeService){

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
          positionId:null,
          unitId:null,
          managerId:null,
          status:null,
          contractType:null,
          workType:null,
          timeKeeperCode:null,
          isExemptTimeKeeper:false,
          googleCalendarId:null,
      })
    })
  }

  get getWorkInfoDto():any{
    return this.employeeForm.get('workInfoDto')
  }

  handleGetFilterEmployee(){   
    const {code,gender} = this.employeeForm.value; 
    const workDto = this.employeeForm.get('workInfoDto')
    const {positionId,unitId,contractType,status} = workDto?.value;
    const filterObject = {
      codeOrName:code,
      gender:gender,
      positionId:positionId,
      unitId:unitId,
      contractType:contractType,
      workStatus:status,
      limit:10,
      offset:0
    };  
    this.employeeService.getListEmployee(filterObject).subscribe(response => {
      this.employeeService.setEmployees = response.data;
    })
  }

  handleResetFilter(){
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
      })
    })
  }
}
  
