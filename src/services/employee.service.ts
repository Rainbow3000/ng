import { Injectable } from "@angular/core";
import { EmployeeDto } from "../dtos/employeeDto";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { FormBuilder } from "@angular/forms";

interface IDataResponse{
    data: EmployeeDto[],
    statusCode:number,
    totalSize:number
}


@Injectable({
    providedIn:'root'
})



export class EmployeeService{
    
    constructor(private httpClient: HttpClient, private fb:FormBuilder){

    }

    _baseUrl:string = "https://localhost:7075/api"

    employees:EmployeeDto[];

    get getEmployees(){
        return this.employees
    }

    set setEmployees(data:EmployeeDto[]){
        this.employees = data;
    }

    getListEmployee(filter:any): Observable<IDataResponse> {
        const keys = Object.keys(filter); 
        let filterString = ""; 
        for(let key of keys){
            if(filter[key] !== null){
                filterString += `${key}=${filter[key]}&`
            }
        }  
        if(filterString.trim().length > 0){
            return this.httpClient.get<IDataResponse>(`${this._baseUrl}/Employees?${filterString.slice(0,filterString.length - 1)}`);   
        } 
        
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