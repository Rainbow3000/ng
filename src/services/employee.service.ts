import { Injectable } from "@angular/core";
import { EmployeeDto } from "../dtos/employeeDto";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class EmployeeService{
    constructor(private httpClient: HttpClient){

    }

    _baseUrl:string = "https://localhost:7075/api"

    employeeData = {
        id:'',
        code:'',
        fullName:'',
        dob:'',
        gender:'',
        phoneNumber:'',
        organEmail:'',
        workInfoDto:{
            employeeId:'',
            positionId:'',
            unitId:'',
            managerId:'',
            status:'',
            contractType:'',
            workType:'',
            timeKeeperCode:'',
            isExemptTimeKeeper:false,
            googleCalendarId:'',
            createdBy:'',
            modifiedBy:''
        },
        identifyType:'',
        identifyNumber:'',
        identifyDateRange:'',
        identifyIssuedBy:'',
        taxtCode:'',
        taxtCodeDateRange:'',
        taxtCodeIssuedBy:'',
        personalEmail:'',
        bank:'',
        bankAccount:'',
        createdBy:'',
        modifiedBy:'',
        educationDto:{
            employeeId:'',
            fromYear:'',
            toYear:'',
            educationPlace:'',
            specification:'',
            degree:'',
            classification:'',
            graduationYear:'',
            createdBy:'',
            modifiedBy:''
        },
        experienceDto:{
            employeeId:'',
            fromDay:'',
            toDay:'',
            workPlace:'',
            workPosition:'',
            comparePerson:'',
            isCheckedCompare:false,
            note:'',
            createdBy:'',
            modifiedBy:''
        },
        fileDto:{
            employeeId:'',
            fileName:'',
            uploadDate:'',
            fileUrl:'',
            createdBy:'',
            modifiedBy:''
        },

        permanentResidenceDto:{
            employeeId:'',
            city:'',
            district:'',
            wards:'',
            houseNumber:'',
            createdBy:'',
            modifiedBy:''
        },

        nowAddressDto:{
            employeeId:'',
            city:'',
            district:'',
            wards:'',
            houseNumber:'',
            createdBy:'',
            modifiedBy:''
        },
        hometownDto:{
            employeeId:'',
            city:'',
            district:'',
            wards:'',
            houseNumber:'',
            createdBy:'',
            modifiedBy:''
        },
        urgentContactDto:{
            employeeId:'',
            fullname:'',
            relational:'',
            phoneNumber:'',
            createdBy:'',
            modifiedBy:''
        },
        salaryInfoDto:{
            employeeId:'',
            levelSalary:'',
            grossSalary:'',
            netSalary:'',
            basicSalary:'',
            insuranceSalary:'',
            totalSalary:'',
            createdBy:'',
            modifiedBy:''
        },
        allowanceSalaryDto:{
            employeeId:'',
            allowanceName:'',
            value:'',
            createdBy:'',
            modifiedBy:''            
        },

        deductibleSalaryDto:{
            employeeId:'',
            deductibleName:'',
            value:'',
            createdBy:'',
            modifiedBy:''
        }

    }

    getListEmployee(): Observable<EmployeeDto[]> {
        return this.httpClient.get<EmployeeDto[]>(`${this._baseUrl}/Employees`);
    }

    createEmployee(employee: EmployeeDto): Observable<EmployeeDto> {
        return this.httpClient.post<EmployeeDto>(`${this._baseUrl}/Employees`, employee);
    }

    updateEmployee(employeeId: string, employee: EmployeeDto): Observable<EmployeeDto> {
        return this.httpClient.put<EmployeeDto>(`${this._baseUrl}/${ employeeId }`, employee);
    }

    deleteEmployee(employeeId: string): Observable<any> {
        return this.httpClient.delete(`${this._baseUrl}/${ employeeId}`);
    }

}