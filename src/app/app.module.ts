import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FilterComponent } from './components/filter/filter.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { TableListComponent } from './components/table-list/table-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { EmployeeActionComponent } from './components/employee-action/employee-action.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { EmployeeTitlePipe } from '../custom/pipe/employeeTitle';
registerLocaleData(vi);

@NgModule({ 
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    FilterComponent,
    TableListComponent,
    EmployeeActionComponent,
    AddressFormComponent,
    EmployeeTitlePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzGridModule,
    NzMenuModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzTableModule,
    NzDividerModule,
    NzDatePickerModule,
    NzSwitchModule,
    NzTabsModule,
    ReactiveFormsModule,
    NzCheckboxModule,
    NzUploadModule,
    NzInputNumberModule,
    NzToolTipModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
