import { Injectable, OnInit } from "@angular/core";
import { EmployeeDto } from "../dtos/employeeDto";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginDto } from "../dtos/loginDto";
import { Router } from "@angular/router";


@Injectable({
    providedIn:'root'
})



export class AccountService{
    user:string | null = localStorage.getItem('user')
    constructor(private httpClient: HttpClient, private router:Router){

    }
   
    _baseUrl:string = "https://localhost:7075/api"

    login(account: any): Observable<any> {
        return this.httpClient.post<any>(`${this._baseUrl}/Accounts/Login`, account);
    }

    get getUser(){
        return this.user;
    }
}