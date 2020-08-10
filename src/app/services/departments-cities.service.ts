import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './../interfaces/contact';

@Injectable({
  providedIn: 'root'

})
export class DepartmentsCitiesService {

  constructor(private http:HttpClient) { }

  getDepartments():Observable<any>{
   let headers = new HttpHeaders();
   headers.append('Content-Type', 'application/json; charset=utf-8'),
   headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

   return this.http.get<any>(environment.urlApi + 'getDepartments', {headers:headers});
  }

  getCitiesByDepartment(id){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json; charset=utf-8'),
    headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    return this.http.get<any>(environment.urlApi + 'getCitiesByDepartment/'+ id, {headers:headers});
   }

}
