import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  user:any = localStorage.getItem('user')
  constructor(private accountService:AccountService, private router:Router){}
  ngOnInit(): void {
    if(this.user !== null){
      this.user = JSON.parse(this.user); 
    }else{
      this.user = null; 
    }
  }
 
  handleLogout(){
    localStorage.removeItem('user');
    this.router.navigate(["/login"]); 
  }
  
}
