import { Component, OnInit } from '@angular/core';
import { ComponentRedering } from '../services/componentRedering.service';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'my-app';
  componentRendering:number; 
  constructor(private accountService:AccountService,private router:Router){}
  ngOnInit(): void {
    if(this.accountService.getUser === null){       
        this.router.navigate(['/login']);
    }
  }

}
