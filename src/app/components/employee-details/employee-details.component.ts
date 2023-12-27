import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent implements OnInit{
  listOfData: Array<{ name: string; age: number; address: string }> = [];
  hiddenEditInfoBasic : boolean = true 
  hiddenEditInfoEmployee : boolean = true 
  hiddenEditSalaryInfo : boolean = true 
  infoBasicOpen:boolean = false
  infoEmployeeOpen:boolean = false
  infoBHXHOpen:boolean = false
  infoContractOpen:boolean = false
  infoAssetsOpen:boolean = false
  linkRender:number = 1;

  ngOnInit(): void {
    for (let i = 0; i < 3; i++) {
      this.listOfData.push({
        name: `Edward King`,
        age: 32,
        address: `London`
      });
    }
  }

  handleChangeLink(link:number){
    this.linkRender = link;
  }

  handleChangeEditInfoBasic(){
    this.hiddenEditInfoBasic = !this.hiddenEditInfoBasic;
    if(this.hiddenEditInfoBasic === false && this.infoBasicOpen === false){
      this.infoBasicOpen = true; 
    }
  }

  handleChangeEditInfoEmployee(){
    this.hiddenEditInfoEmployee = !this.hiddenEditInfoEmployee;
    if(this.hiddenEditInfoEmployee === false && this.infoEmployeeOpen === false){
      this.infoEmployeeOpen = true; 
    }
  }

  handleChangeEditSalaryInfo(){
    this.hiddenEditSalaryInfo = !this.hiddenEditSalaryInfo;
    if(this.hiddenEditSalaryInfo === false && this.infoContractOpen === false){
      this.infoContractOpen = true; 
    }
  }

  handleChangeStateInfoBasic(type:any){
    if(type === 1){
      this.infoEmployeeOpen = false;
      this.infoBHXHOpen = false;
      this.infoContractOpen = false;
      this.infoAssetsOpen = false;
      this.infoBasicOpen = true; 
      return;
    }
    this.infoBasicOpen = !this.infoBasicOpen;
  }

  handleChangeStateInfoEmployee(type:any){
    if(type === 1){
      this.infoBHXHOpen = false;
      this.infoContractOpen = false;
      this.infoAssetsOpen = false;
      this.infoBasicOpen = false; 
      this.infoEmployeeOpen = true; 
      return;
    }
    this.infoEmployeeOpen = !this.infoEmployeeOpen;
  }

  handleChangeStateInfoBHXH(type:any){
    if(type === 1){
      this.infoEmployeeOpen = false;
      this.infoContractOpen = false;
      this.infoAssetsOpen = false;
      this.infoBasicOpen = false;
      this.infoBHXHOpen = true;
      return;
    }
    this.infoBHXHOpen = !this.infoBHXHOpen;
  }

  handleChangeStateInfoContract(type:any){
    if(type === 1){
      this.infoEmployeeOpen = false;
      this.infoBHXHOpen = false;
      this.infoAssetsOpen = false;
      this.infoBasicOpen = false;
      this.infoContractOpen = true; 
      return;
    }
    this.infoContractOpen = !this.infoContractOpen; 
  }

  handleChangeStateInfoAssets(type:any){
    if(type === 1){
      this.infoEmployeeOpen = false;
      this.infoBHXHOpen = false;
      this.infoContractOpen = false;
      this.infoBasicOpen = false;
      this.infoAssetsOpen = true;
      return;
    }
    this.infoAssetsOpen = !this.infoAssetsOpen; 
  }
  
}
