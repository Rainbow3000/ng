import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { EmployeeDto } from "../dtos/employeeDto";

@Injectable({
    providedIn: "root",
  })
  export class ComponentRedering {
    private componentRenderSubject = new Subject<number>();
    $_componentRenderValue = this.componentRenderSubject.asObservable();

    private formModeSubject = new Subject<string>();
    $_formModeValue = this.componentRenderSubject.asObservable();

    private userNameUpdateSubject = new Subject<string>();
    $_userNameUpdatetValue = this.userNameUpdateSubject.asObservable();

    private employeeUpdateSubject = new Subject<EmployeeDto>();
    $_employeeUpdatetValue = this.employeeUpdateSubject.asObservable();

    private isLoadingSubject = new Subject<boolean>();
    $_isLoadingValue = this.isLoadingSubject.asObservable();  
    private _componentRendering: number = 1;
    private _formMode: string = "CREATE";
    private _userNameUpdate:string = ""
    private _employeeUpdate:EmployeeDto;
    private _isLoading:boolean = false;

    get getIsLoading(){
      return this._isLoading;
    }

    set setIsLoading(value:boolean){
       if(this._isLoading !== value){
        this._isLoading = value;
       }
    }

    get getEmployeeUpdate():EmployeeDto{
      return this._employeeUpdate; 
    }

    set setEmployeeUpdate(value:EmployeeDto){
      if (JSON.stringify(this._employeeUpdate) !== JSON.stringify(value)) {
        this._employeeUpdate = value;
        this.employeeUpdateSubject.next(value);
      }
    }




    get getUserNameUpdate():string{
      return this._userNameUpdate; 
    }

    set setUserNameUpdate(value:string){
      if (this._userNameUpdate !== value) {
        this._userNameUpdate = value;
        this.userNameUpdateSubject.next(value);
      }
    }


    get getFormMode():string{
      return this._formMode; 
    }

    set setFormMode(value:string){
      if (this._formMode !== value) {
        this._formMode = value;
        this.formModeSubject.next(value);
      }
    }


    get getComponentRendering():number{
      return this._componentRendering; 
    }

    set setComponentRendering(value: number) {
      if (this._componentRendering !== value) {
        this._componentRendering = value;
        this.componentRenderSubject.next(value);
      }
    }

  }