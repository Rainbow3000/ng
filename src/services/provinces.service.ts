

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
})

export class ProvincesService{
    constructor(private httpClient:HttpClient){
        
    }

    getProvinces(): Observable<any[]> {
        return this.httpClient.get<any[]>('https://provinces.open-api.vn/api/?depth=3');
    }
}