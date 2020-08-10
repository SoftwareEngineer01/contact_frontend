import { Component, OnInit } from '@angular/core';
import { DepartmentsCitiesService } from 'src/app/services/departments-cities.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from "sweetalert2";
import { Contact } from './../../interfaces/contact';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  public departments: any;

  public cities = [];
  public formGroup: FormGroup;
  public submitted = false;
  public contact: Contact;
  public empSelected: Number;
  public modifedText: string;

  constructor(private data:DepartmentsCitiesService, private formBuilder: FormBuilder) { }

  ngOnInit(){
    this.getDepartments();
    this.buildForm();
  }

   // convenience getter for easy access to form fields
  get f() { return this.formGroup.controls; }

  private buildForm(){
    this.formGroup = this.formBuilder.group({
      department: ['', [Validators.required, Validators.maxLength(30)]],
      city: ['', [Validators.required, Validators.maxLength(50)]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"), Validators.maxLength(30)]]
    });
  }

  onChange(newValue) {
    console.log(newValue);
  }

  getDepartments(){
    this.data.getDepartments().subscribe(res => {
      if(res.code == 200){
        this.departments = res.data;
      }
    }, error => {
        console.log(error);
    })
  }

  changeDepartment(idDepartment:any){
    this.data.getCitiesByDepartment(idDepartment).subscribe(res => {
      if(res.code == 200){
        this.cities = res.data;
      }
    }, error => {
        console.log(error);
    });
  }

  sendData(){
    this.submitted = true;
    if (!this.formGroup.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Validar todos los campos'
      });
    }else{
      const formData = this.formGroup.value;
      // this.data.saveContact(formData).subscribe(res => {
      //  if(res.status){
      //   this.contact = res;
      //  }
      // })
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Tu información ha sido recibida satisfactoriamente'
      });
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  }

}
