import { Component } from '@angular/core';
import { ComponentRedering } from '../../../services/componentRedering.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private cr: ComponentRedering){

  }
  handleShowComponentCreate(value:number){
     this.cr.setComponentRendering = value; 
  }
}
