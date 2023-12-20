import { Component, OnInit } from '@angular/core';
import { ComponentRedering } from '../../../services/componentRedering.service';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeDto } from '../../../dtos/employeeDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  employeeList:EmployeeDto[]; 

  constructor(private cr: ComponentRedering,private employeeService:EmployeeService){

  }
  ngOnInit(): void {
    this.employeeService.getListEmployee().subscribe(data => this.employeeList = data);
  }
  handleShowComponentCreate(value:number){
     this.cr.setComponentRendering = value; 
     this.cr.setFormMode = 'CREATE'
  }
}
