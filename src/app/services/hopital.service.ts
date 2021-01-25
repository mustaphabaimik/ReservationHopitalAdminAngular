import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hopital } from '../modules/hopital.module';
import { Hopitauxserverresponse } from '../components/listservices/listservices.component';

@Injectable({
  providedIn: 'root'
})
export class HopitalService {

  constructor(private http:HttpClient) { }


  getall(){
    return this.http.get<Hopitauxserverresponse>("http://localhost:5000/api/hopitaux");
  }


  statisReserHop(){
    return this.http.get("http://localhost:5000/api/statisReservHop");
  }

  staticNbrUser(){
    return this.http.get("http://localhost:5000/api/staticNbrUser");
  }

  statisSpecialite(){
    return this.http.get("http://localhost:5000/api/statisSpecialite");
  }

  statisNbrReser(){
    return this.http.get("http://localhost:5000/api/statisNbrReser");
  }

  statNbrMedecin(){
    return this.http.get("http://localhost:5000/api/statNbrMedecin");
  }


}
