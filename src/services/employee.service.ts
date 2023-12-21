import { Injectable } from "@angular/core";
import { EmployeeDto } from "../dtos/employeeDto";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

interface IDataResponse{
    data: EmployeeDto[],
    statusCode:number
}

@Injectable({
    providedIn:'root'
})



export class EmployeeService{
    
    constructor(private httpClient: HttpClient){

    }

    _baseUrl:string = "https://localhost:7075/api"


    getListEmployee(): Observable<IDataResponse> {
        return this.httpClient.get<IDataResponse>(`${this._baseUrl}/Employees`);
    }

    createEmployee(employee: EmployeeDto): Observable<IDataResponse> {
        return this.httpClient.post<IDataResponse>(`${this._baseUrl}/Employees`, employee);
    }

    updateEmployee(employeeId: string, employee: EmployeeDto): Observable<IDataResponse> {
        return this.httpClient.put<IDataResponse>(`${this._baseUrl}/Employees/${ employeeId }`, employee);
    }

    deleteEmployee(employeeId: string): Observable<any> {
        return this.httpClient.delete(`${this._baseUrl}/Employees/${ employeeId}`);
    }

}