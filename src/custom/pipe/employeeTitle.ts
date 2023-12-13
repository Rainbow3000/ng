import { Pipe } from "@angular/core";

interface PipeTransform {
    transform(value: any, ...args: any[]): any;
}


@Pipe({
  name: "employeeTitle",
})

export class EmployeeTitlePipe implements PipeTransform {
    transform(resourceId: string, employeeName:string): string {
      return resourceId === "CREATE" ? "Thêm mới nhân viên":`Sửa thông tin nhân viên: ${employeeName}`;
    }
}