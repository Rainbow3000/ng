import { Component, Input } from '@angular/core';
import { EmployeeDto } from '../../../dtos/employeeDto';
import { ProvincesService } from '../../../services/provinces.service';
import { ComponentRedering } from '../../../services/componentRedering.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-form-details',
  templateUrl: './address-form-details.component.html',
  styleUrl: './address-form-details.component.scss'
})
export class AddressFormDetailsComponent {

  
  provinces : any[]
  districts:any[]
  wards:any[]
  provinceUpdate:string
  districtUpdate:string
  wardsUpdate:string
  employeeUpdate:EmployeeDto
  constructor(private provincesService: ProvincesService,private cr : ComponentRedering){
    
  }
   ngOnInit(): void {
      this.provincesService.getProvinces().subscribe((data)=> {
        this.provinces = data;   
        if(this.cr.getFormMode === "VIEW"){
            this.districts = this.provinces.find(item => item.name === this.addressItem?.city)?.districts     
            this.wards = this.districts?.find(item => item.name ===this.addressItem?.district)?.wards
        }
      });   
      
    }
  @Input() addressItem:any;
  @Input() formGroupItem:FormGroup; 
  @Input() hiddenEditInfoEmployee:boolean
  handleChangeCity(prov:any){
      this.districts = this.provinces?.find(item => item.name === prov).districts;
  }

  handleChageDistrict(dis:any){
    this.wards = this.districts?.find(item => item.name === dis).wards
  }
}
