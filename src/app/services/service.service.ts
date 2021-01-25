import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from '../modules/service.module';
import { Servicesserverresponse } from '../components/listservices/listservices.component';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }



  ajouterService(resource){
    this.http.post("http://localhost:5000/api/services",resource);
  }

  getall(){
    return this.http.get<Servicesserverresponse>("http://localhost:5000/api/services");
  }

  getservicesByHop(idHopital:number){
    return this.http.get<Servicesserverresponse>("http://localhost:5000/api/servicesByHop/"+idHopital);
  }

  save(service:Service){    
    return this.http.post("http://localhost:5000/api/services",service);
  } 

  addserviceToHopital(slug:string,hopitaux:number[]){
    return this.http.post("http://localhost:5000/api/servicesToHop",{slug,hopitaux});

  }
}
