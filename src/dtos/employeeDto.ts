import { AllowanceSalaryDto } from "./allowanceSalaryDto";
import { DeductibleSalaryDto } from "./deductibleSalaryDto";
import { EducationDto } from "./educationDto";
import { ExperienceDto } from "./experienceDto";
import { FileDto } from "./fileDto";
import { HometownDto } from "./homeTownDto";
import { NowAddressDto } from "./nowAddressDto";
import { PermanentResidenceDto } from "./permanentResidenceDto";
import { SalaryInfoDto } from "./salaryInfoDto";
import { UrgentContactDto } from "./urgentContactDto";
import { WorkInfoDto } from "./workInfoDto";

export interface EmployeeDto{
    id:string,
    code:string,
    fullName:string,
    dob:string,
    gender:string,
    phoneNumber:string,
    organEmail:string,
    identifyType:string,
    identifyNumber:string,
    identifyDateRange:string,
    identifyIssuedBy:string,
    taxtCode:string,
    taxtCodeDateRange:string,
    taxtCodeIssuedBy:string,
    personalEmail:string,
    bank:string,
    bankAccount:string,
    createdBy:string,
    modifiedBy:string,
    workInfoDto:WorkInfoDto,
    educationDto:EducationDto[],
    experienceDto:ExperienceDto[],
    fileDto:FileDto[],
    permanentResidenceDto:PermanentResidenceDto,
    nowAddressDto:NowAddressDto,
    hometownDto:HometownDto,
    urgentContactDto:UrgentContactDto,
    salaryInfoDto:SalaryInfoDto,
    allowanceSalaryDto:AllowanceSalaryDto,
    deductibleSalaryDto:DeductibleSalaryDto
}
