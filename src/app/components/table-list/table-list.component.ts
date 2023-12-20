import { Component, Input, OnInit } from '@angular/core';
import { ComponentRedering } from '../../../services/componentRedering.service';
import { EmployeeDto } from '../../../dtos/employeeDto';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss'
})
export class TableListComponent implements OnInit {
  
  @Input()listOfData:EmployeeDto[];
    ngOnInit(): void {
     
    }

    constructor(private cr:ComponentRedering){

    }


    handleShowComponentCreate(value:number){
      this.cr.setComponentRendering = value; 
      this.cr.setFormMode = "UPDATE"
    }
    

    listOfSelection = [
      {
        text: 'Select All Row',
        onSelect: () => {
          this.onAllChecked(true);
        }
      },
      {
        text: 'Select Odd Row',
        onSelect: () => {
          this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.employeeId, index % 2 !== 0));
          this.refreshCheckedStatus();
        }
      },
      {
        text: 'Select Even Row',
        onSelect: () => {
          this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.employeeId, index % 2 === 0));
          this.refreshCheckedStatus();
        }
      }
    ];
    checked = false;
    indeterminate = false;
    listOfCurrentPageData: readonly EmployeeDto[] = [];
    setOfCheckedId = new Set<string>();
  
    updateCheckedSet(id: string, checked: boolean): void {
      if (checked) {
        this.setOfCheckedId.add(id);
      } else {
        this.setOfCheckedId.delete(id);
      }
    }
  
    onItemChecked(id: string, checked: boolean): void {
      this.updateCheckedSet(id, checked);
      this.refreshCheckedStatus();
    }
  
    onAllChecked(value: boolean): void {
      this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.employeeId, value));
      this.refreshCheckedStatus();
    }
  
    onCurrentPageDataChange($event: readonly EmployeeDto[]): void {
      this.listOfCurrentPageData = $event;
      this.refreshCheckedStatus();
    }
  
    refreshCheckedStatus(): void {
      this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.employeeId));
      this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.employeeId)) && !this.checked;
    }
}
