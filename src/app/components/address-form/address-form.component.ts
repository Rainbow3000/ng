import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ProvincesService } from '../../../services/provinces.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent implements OnInit{

  provinces : any[]
  districts:any[]
  wards:any[]

  constructor(private provincesService: ProvincesService){
    
  }
   ngOnInit(): void {
      this.provincesService.getProvinces().subscribe((data)=> {
        this.provinces = data;   
      });   
    }

  @Input() formGroupItem:FormGroup; 

  handleChangeCity(prov:any){
      this.districts = this.provinces?.find(item => item.name === prov).districts;
  }

  handleChageDistrict(dis:any){
    
    this.wards = this.districts?.find(item => item.name === dis).wards
  }


}
