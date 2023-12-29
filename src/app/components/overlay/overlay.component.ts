import { Component, OnInit } from '@angular/core';
import { ComponentRedering } from '../../../services/componentRedering.service';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss'
})
export class OverlayComponent implements OnInit{
  constructor(private cr: ComponentRedering){
    
  }
  ngOnInit(): void {
    this.cr.$_isLoadingValue.subscribe(data => this.isLoading = data);
    this.isLoading = this.cr.getIsLoading;
  }
  isLoading:boolean
}
