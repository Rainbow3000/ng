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
    id:string | null,
    code:string | null,
    fullName:string | null,
    dob:string | null,
    gender:string | null,
    phoneNumber:string | null,
    organEmail:string | null,
    identifyType:string | null,
    identifyNumber:string | null,
    identifyDateRange:string | null,
    identifyIssuedBy:string | null,
    taxtCode:string | null,
    taxtCodeDateRange:string | null,
    taxtCodeIssuedBy:string | null,
    personalEmail:string | null,
    bank:string | null,
    bankAccount:string | null,
    createdBy:string | null,
    modifiedBy:string | null,
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
