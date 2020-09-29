import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../store/services/employee.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent {

  employeeForm = new FormGroup({
    name: new FormControl(''),
    employeeCode: new FormControl('', [
      Validators.required,
      isEmployeeCodeTaken(this.employeeService.employeesList) // <-- Here's how you pass in the custom validator.
    ]),
    age: new FormControl(''),
    salary: new FormControl(''),
  });
  employeeId: number;
  employeesData: any = [];
  
  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
    if (this.employeeId){
    this.employeeService.getEmployee(this.employeeId).subscribe(
            (data:any)=>{
              this.employeeForm.patchValue({
                name: data.name,
                employeeCode: data.employeeCode,
                age: data.age,
                salary: data.salary,                
              });
            }
          )
    }
  }
  onSubmit() {
    if (this.employeeId){
    this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value).subscribe(
      (data:any)=>{
        this.router.navigate(['/view-employees']);
      }
    )
    }else{
      this.employeeService.addEmployee(this.employeeForm.value).subscribe(
        (data:any)=>{
          this.router.navigate(['/view-employees']);
        }
      )
    }
  }
  redirectToViewPage() {
    this.router.navigate(['/view-employee']);
  }
}

export function isEmployeeCodeTaken(employeesList: any): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {    
    const taken = employeesList.find((employee)=>{
      if(employee.employeeCode === control.value){        
        return true;
      }else{
        return false;
      }
    })
     return taken ? {employeeCodeTaken: {value: control.value}} : null;
  };
}