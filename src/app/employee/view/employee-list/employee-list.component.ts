import { Component } from '@angular/core';
import { EmployeeService } from '../../../store/services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent {  
  employeesdata = [];

  constructor( private employeeService: EmployeeService, private router: Router){    
  }

  ngOnInit(){
    this.initialzeEmployee();     
  }
  initialzeEmployee(){
    this.employeeService.getEmployees().subscribe(
      (data:any)=>{
        this.employeesdata = data;        
      }
    );   
  }
  deleteEmployee(id) {
    this.employeeService.deleteEmployee(id).subscribe(
      (data:any)=>{
        this.initialzeEmployee();
      }
    );
  }
  editEmployee(id) {
    this.router.navigate(['/edit-employee', { id: id }]);
  }
  redirectToLearn() {
    this.router.navigate(['/directives']);
  }
  redirectToAddEmployee() {
    this.router.navigate(['/add-employee']);
  }

}
