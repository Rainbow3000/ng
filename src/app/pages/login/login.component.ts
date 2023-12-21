import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  
  constructor(private fb: NonNullableFormBuilder, private accountService:AccountService,private router:Router,private message: NzMessageService) {}
  ngOnInit(): void {
    const userString  = localStorage.getItem('user');
    if(userString !== null && userString !== undefined){
      this.router.navigate(['/']);
    }
  }
  validateForm: FormGroup<{
    userName: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  
  createMessage(type: string,messageText:string): void {
    this.message.create(type,messageText);
  }

  
  handleShowErrText(err:any){

    if(typeof err.error.message === 'object'){   
      for(let item of err.error.message){      
        const obj = Object.keys(item);        
        this.createMessage('error',item[obj[0]]);
      }  
      return;
    }
    this.createMessage('error',err.error.Message)
  }
  submitForm(): void {
    if (this.validateForm.valid) {
      this.accountService.login(this.validateForm.value).subscribe(response =>{
         localStorage.setItem('user', JSON.stringify(response.data));
         this.router.navigate(['/'])
      },
      err => this.handleShowErrText(err)
      )
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  
}
