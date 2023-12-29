import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ComponentRedering } from '../../../services/componentRedering.service';
import { EmployeeDto } from '../../../dtos/employeeDto';
import {
  WORK_STATUS,
  WORK_TYPE,
  GENDER,
  BANK,
  CONTRACT_TYPE,
  IDENTIFY_TYPE,
  POSITION,
  MANAGER,
} from '../../../enum/enum';
import { EmployeeService } from '../../../services/employee.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { getCharName } from '../../../helper/getCharName';
import { randomColor } from '../../../helper/randomColor';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss',
})
export class TableListComponent implements OnInit {
  pageSize = 10;
  pageIndex = 1;
  totalSizeTable = 0;
  constructor(
    private cr: ComponentRedering,
    private employeeService: EmployeeService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.limit = 10;
    this.offset = 0;
    this.getList();
    this.cr.setIsLoading = true;
    this.employeeService.$_employees.subscribe(
      (data) => (this.employeeList = data)
    );
  }

  getList() {
    this.limit = this.pageSize;
    this.offset = (this.pageIndex - 1) * this.pageSize;
    this.cr.setIsLoading = true;
    this.employeeService
      .getListEmployee({ limit: this.limit, offset: this.offset })
      .subscribe((response) => {
        this.employeeService.employees = response.data;
        this.employeeList = this.employeeService.employees;
        this.totalSizeTable = response.totalSize;
        this.cr.setIsLoading = false;
      });
  }

  limit: number;
  offset: number;
  WORK_STATUS: any = WORK_STATUS;
  WORK_TYPE: any = WORK_TYPE;
  GENDER: any = GENDER;
  BANK: any = BANK;
  CONTRACT_TYPE: any = CONTRACT_TYPE;
  IDENTIFY_TYPE: any = IDENTIFY_TYPE;
  POSITION: any = POSITION;
  MANAGER: any = MANAGER;
  getCharName = getCharName;
  randomColor = randomColor;
  employeeList: EmployeeDto[];
  @ViewChild('avatar') avatarRef: any;

  createMessage(type: string, messageText: string): void {
    this.message.create(type, messageText);
  }

  handleShowComponentCreate(value: number, employee: EmployeeDto) {
    this.cr.setEmployeeUpdate = employee;
    this.cr.setComponentRendering = value;
    this.cr.setUserNameUpdate = employee.fullName;
    this.cr.setFormMode = 'UPDATE';
  }

  handleShowComponentViewDetails(value: number, employee: EmployeeDto) {
    this.cr.setEmployeeUpdate = employee;
    this.cr.setComponentRendering = value;
    this.cr.setUserNameUpdate = employee.fullName;
    this.cr.setFormMode = 'VIEW';
  }

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
    this.listOfCurrentPageData.forEach((item) =>
      this.updateCheckedSet(item.employeeId, value)
    );
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly EmployeeDto[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item) =>
      this.setOfCheckedId.has(item.employeeId)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some((item) =>
        this.setOfCheckedId.has(item.employeeId)
      ) && !this.checked;
  }

  handleShowErrText(err: any) {
    this.createMessage('error', err.error.message);
  }

  handleDeleteEmployee(employeeId: string) {
    const isConfirm = confirm('Bạn có chắc muốn xóa nhân viên này không ?');
    if (isConfirm) {
      this.employeeService.deleteEmployee(employeeId).subscribe(
        (data) => {
          this.createMessage('success', 'Xóa nhân viên thành công');
          this.limit = 10;
          this.offset = 0;
          this.getList();
        },

        (err) => this.handleShowErrText(err)
      );
    }
  }

  onQueryParamsChange(data: NzTableQueryParams) {
    if (this.pageIndex != data.pageIndex || this.pageSize != data.pageSize) {
      this.pageIndex = data.pageIndex;
      this.pageSize = data.pageSize;
      this.getList();
    }
  }
}
