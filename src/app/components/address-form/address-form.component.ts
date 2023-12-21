import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProvincesService } from '../../../services/provinces.service';
import { ComponentRedering } from '../../../services/componentRedering.service';
import { EmployeeDto } from '../../../dtos/employeeDto';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent implements OnInit{

  provinces : any[]
  districts:any[]
  wards:any[]
  provinceUpdate:string
  districtUpdate:string
  wardsUpdate:string
  employeeUpdate:EmployeeDto
  constructor(private provincesService: ProvincesService,private cr : ComponentRedering  ){
    
  }
   ngOnInit(): void {
      this.provincesService.getProvinces().subscribe((data)=> {
        this.provinces = data;   
        if(this.cr.getFormMode === "UPDATE"){
            this.districts = this.provinces.find(item => item.name === this.addressItem?.city)?.districts     
            this.wards = this.districts?.find(item => item.name ===this.addressItem?.district)?.wards
        }
      });   
      
    }
  @Input() addressItem:any;
  @Input() formGroupItem:FormGroup; 

  handleChangeCity(prov:any){
      this.districts = this.provinces?.find(item => item.name === prov).districts;
  }

  handleChageDistrict(dis:any){
    
    this.wards = this.districts?.find(item => item.name === dis).wards
  }


}
