import { AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { ComponentRedering } from '../../../services/componentRedering.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss'
})
export class OverlayComponent implements AfterContentChecked{
  constructor(private cr: ComponentRedering){
    
  }
  ngAfterContentChecked(): void {
    this.cr.$_isLoadingValue.subscribe(data => this.isLoading = data);
    this.isLoading = this.cr.getIsLoading;
  }

  isLoading:boolean
}
