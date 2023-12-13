import { Component, OnInit } from '@angular/core';
import { ComponentRedering } from '../../../services/componentRedering.service';


interface IEmployee{
  id: number;
  employeeName: string;
  employeeCode: string;
  position:string,
  manager:string,
  dob:string,
  gender:string,
  phoneNumber:string,
  status:string,
  email:string
}


@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss'
})
export class TableListComponent implements OnInit {
    ngOnInit(): void {
     
    }

    constructor(private cr:ComponentRedering){

    }


    handleShowComponentCreate(value:number){
      this.cr.setComponentRendering = value; 
      this.cr.setFormMode = "UPDATE"
    }
    

    listOfData:IEmployee[] = [
      {
        id:1,
        employeeCode:"nv-1",
        employeeName:"Nguyễn Đức Thịnh",
        position:"Thực tập",
        manager:"Nguyễn Văn Sơn",
        dob:"22/12/2023",
        gender:"Nam",
        phoneNumber:"02385235928",
        status:"Đang làm việc",
        email:"nguyenducthinh0401@gmail.com"
      }
    ]

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
          this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
          this.refreshCheckedStatus();
        }
      },
      {
        text: 'Select Even Row',
        onSelect: () => {
          this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
          this.refreshCheckedStatus();
        }
      }
    ];
    checked = false;
    indeterminate = false;
    listOfCurrentPageData: readonly IEmployee[] = [];
    setOfCheckedId = new Set<number>();
  
    updateCheckedSet(id: number, checked: boolean): void {
      if (checked) {
        this.setOfCheckedId.add(id);
      } else {
        this.setOfCheckedId.delete(id);
      }
    }
  
    onItemChecked(id: number, checked: boolean): void {
      this.updateCheckedSet(id, checked);
      this.refreshCheckedStatus();
    }
  
    onAllChecked(value: boolean): void {
      this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
      this.refreshCheckedStatus();
    }
  
    onCurrentPageDataChange($event: readonly IEmployee[]): void {
      this.listOfCurrentPageData = $event;
      this.refreshCheckedStatus();
    }
  
    refreshCheckedStatus(): void {
      this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
      this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
    }
}
