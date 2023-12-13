import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
    providedIn: "root",
  })
  export class ComponentRedering {
    private componentRenderSubject = new Subject<number>();
    $_componentRenderValue = this.componentRenderSubject.asObservable();

    private formModeSubject = new Subject<string>();
    $_formModeValue = this.componentRenderSubject.asObservable();

    private _componentRendering: number = 1;
    private _formMode: string = "CREATE";


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