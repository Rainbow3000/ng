import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ComponentRedering } from '../../../services/componentRedering.service';
import { EmployeeDto } from '../../../dtos/employeeDto';
import {WORK_STATUS,WORK_TYPE,GENDER,BANK,CONTRACT_TYPE,IDENTIFY_TYPE,POSITION,MANAGER} from '../../../enum/enum'
import { EmployeeService } from '../../../services/employee.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {getCharName} from '../../../helper/getCharName'
import {randomColor} from '../../../helper/randomColor'
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss'
})
export class TableListComponent implements AfterViewChecked {
  
  
  constructor(private cr:ComponentRedering, private employeeService:EmployeeService,private message: NzMessageService){

  }
  ngAfterViewChecked(): void {
     this.avatarRef.nativeElement.style.backgroundColor = randomColor(); 
  }
  WORK_STATUS:any = WORK_STATUS
  WORK_TYPE:any =WORK_TYPE
  GENDER:any = GENDER
  BANK:any = BANK
  CONTRACT_TYPE:any = CONTRACT_TYPE
  IDENTIFY_TYPE:any = IDENTIFY_TYPE
  POSITION:any = POSITION
  MANAGER:any = MANAGER
  getCharName = getCharName
  randomColor = randomColor

  @Input()listOfData:EmployeeDto[];
  @ViewChild('avatar') avatarRef: ElementRef;

    createMessage(type: string,messageText:string): void {
      this.message.create(type,messageText);
    }
  


    handleShowComponentCreate(value:number,employee:EmployeeDto){
      this.cr.setEmployeeUpdate = employee;  
      this.cr.setComponentRendering = value; 
      this.cr.setUserNameUpdate = employee.fullName;
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

    handleShowErrText(err:any){
        this.createMessage('error',err.error.message)
    }


    handleDeleteEmployee(employeeId:string){

      const isConfirm = confirm("Bạn có chắc muốn xóa nhân viên này không ?");
      if(isConfirm){
        this.employeeService.deleteEmployee(employeeId).subscribe(
          data => {
          this.createMessage('success','Xóa nhân viên thành công')
          this.employeeService.getListEmployee().subscribe(response =>{
            this.listOfData = response.data ;
          })
        }, 

        err => this.handleShowErrText(err)
        
        )
      }

    }
}
