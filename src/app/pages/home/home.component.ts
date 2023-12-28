import { Component, OnInit } from '@angular/core';
import { ComponentRedering } from '../../../services/componentRedering.service';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeDto } from '../../../dtos/employeeDto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
  componentRendering:number; 
  constructor(private cr: ComponentRedering,private employeeService:EmployeeService){
    this.componentRendering = cr.getComponentRendering;

    this.cr.$_componentRenderValue.subscribe((newValue) => {
      this.componentRendering = newValue;
    });
  }

  handleShowComponentCreate(value:number){
     this.cr.setComponentRendering = value; 
     this.cr.setFormMode = 'CREATE'
  }

}