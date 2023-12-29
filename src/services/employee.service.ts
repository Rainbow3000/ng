import { Injectable } from "@angular/core";
import { EmployeeDto } from "../dtos/employeeDto";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, map } from "rxjs";
import { FormBuilder } from "@angular/forms";

interface IDataResponse{
    data: any,
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

     private employeesSubject = new Subject<EmployeeDto[]>();
     $_employees = this.employeesSubject.asObservable();;
     employees:EmployeeDto[]

    get getEmployees(){
        return this.employees
    }

    set setEmployees(value:EmployeeDto[]){ 
        
        if( JSON.stringify(this.employees) !== JSON.stringify(value)) {
            this.employees = value; 
           this.employeesSubject.next(value);
         }
    }

    getListEmployee(filter:any): Observable<IDataResponse>{
        const keys = Object.keys(filter); 
        let filterString = ""; 
        for(let key of keys){
            if(filter[key] !== null){
                filterString += `${key}=${filter[key]}&`
            }
        }        
       return this.httpClient.get<IDataResponse>(`${this._baseUrl}/Employees?${filterString.slice(0,filterString.length - 1)}`)
       
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