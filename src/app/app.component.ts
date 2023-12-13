import { Component } from '@angular/core';
import { ComponentRedering } from '../services/componentRedering.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'my-app';
  componentRendering:number; 
  constructor(private cr:ComponentRedering){

    this.componentRendering = cr.getComponentRendering;

    this.cr.$_componentRenderValue.subscribe((newValue) => {
      this.componentRendering = newValue;
    });
  }

}
