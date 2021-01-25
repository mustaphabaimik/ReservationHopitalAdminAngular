import { Component, OnInit } from '@angular/core';

import { Hopital } from 'src/app/modules/hopital.module';
import { Service } from 'src/app/modules/service.module';
import { HopitalService } from 'src/app/services/hopital.service';
import { ServiceService } from 'src/app/services/service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listservices',
  templateUrl: './listservices.component.html',
  styleUrls: ['./listservices.component.css']
})
export class ListservicesComponent implements OnInit {
  items:Hopital[];

  // hopitaux;

  selectedItem:Hopital[]=[];
  selectedhop=[];
  service=new Service;
  services:Service[];
 

  constructor(private hopitalservice:HopitalService,private serviceservice:ServiceService,private toastr: ToastrService) { }

  ngOnInit(): void {
     this.hopitalservice.getall()
     .subscribe((data:Hopitauxserverresponse)=>{

      console.log("hopitaaaaux    ici :" + data.hopitaux);
       this.items=data.hopitaux;
       console.log(data);
     });
    this.getall();  
  }
  
  ajouterservice(){
    this.selectedhop=[];
    if(this.selectedItem.length>0){
          for(let i of this.selectedItem){
            this.selectedhop.push(i.ObjectId);    
          }
          this.serviceservice.save(this.service)
          .subscribe((data:serveraddserviceresponse)=>{      
              this.serviceservice.addserviceToHopital(data.slug,this.selectedhop)
              .subscribe(data=>{ 
                    this.getall(); 
                    this.selectedItem=[];      
                    this.toastr.success("Opération terminée avec succès","", {
                      timeOut: 3500,
                      progressBar: true,
                      progressAnimation: 'increasing',
                      positionClass: 'toast-top-left'
                    })
              },err=>{
                this.toastr.error("quelque chose s'est mal passé","Erreur", {
                  timeOut: 3500,
                  progressBar: true,
                  progressAnimation: 'increasing',
                  positionClass: 'toast-top-left'
                })
              });
          },err=>{
            this.toastr.error("quelque chose s'est mal passé","Erreur", {
              timeOut: 3500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-left'
            })
          });
      
    }
    else{
          this.toastr.error("Veuillez choisir au moins un hopital","Erreur", {
            timeOut: 3500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-left'
          })
    }
    
  }


  getall(){
    this.serviceservice.getall()
    .subscribe((data:Servicesserverresponse)=>{
      this.services=data.services;
    })
  }



 

}

export interface Hopitauxserverresponse{

    hopitaux:Hopital[];
}

export interface Servicesserverresponse{
  services:Service[];
}

export interface serveraddserviceresponse{
  message:string;
  slug:string;
}
