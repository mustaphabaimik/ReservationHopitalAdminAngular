import { Component, OnInit } from '@angular/core';
import { Hopital } from 'src/app/modules/hopital.module';
import { Medecin } from 'src/app/modules/medecin.module';
import { Service } from 'src/app/modules/service.module';
import { HopitalService } from 'src/app/services/hopital.service';
import { ServiceService } from 'src/app/services/service.service';
import { Hopitauxserverresponse } from '../listservices/listservices.component';
import { Servicesserverresponse } from '../listservices/listservices.component';
import { ToastrService } from 'ngx-toastr';
import { MedecinService } from 'src/app/services/medecin.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core/testing';


@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.css']
})
export class MedecinComponent implements OnInit {

 
  user=new Medecin;
  isActive:boolean;
  image;
  hopitaux:Hopital[];
  afficherservice=false;
  services:Service[];
  formData;
  url;
  nomImage;
  medecins:Medecin[];
  imageArea:boolean=true;

  constructor(private hopitalservice:HopitalService,private serviceservice:ServiceService,private medecinservice:MedecinService,private toastr: ToastrService,private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.hopitalservice.getall()
    .subscribe((data:Hopitauxserverresponse)=>{
        this.hopitaux=data.hopitaux;
    });

     this.getall();

    
   
  }

  getall(){
    this.medecinservice.getall()
    .subscribe(data=>{
      console.log(data);
      this.medecins=data;
    })
  }


  fileisselected(event){
  
    if(event.target.files.length>0){
     
      // this.formData.append('phoUrl',event.target.files[0]); 
      const file=event.target.files[0];
      this.image=file;

      // console.log(this.image);
      var reader=new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e:any)=>{
        this.url=e.target.result;
      }
    
    } 
  }

 

  selectedHopital(e){
     
     this.services=[];
     this.serviceservice.getservicesByHop(e.target.value)
     .subscribe((data:Servicesserverresponse)=>{
        
         this.services=data.services;
         if(this.services.length==0){
          this.afficherservice=false;
          this.toastr.error("aucun service dans l'hopital sélectionné","", {
            timeOut: 3500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-left'
          })
         }
         else{
          this.afficherservice=true;
         }
         
     },er=>{
      this.toastr.error(er,"Erreur", {
        timeOut: 3500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-left'
      })
     });
  }

  ajouterMedecin(){

    this.formData=new FormData(); 
    this.user.role="medecin";
    this.formData.append("nom",this.user.nom);
    this.formData.append("prenom",this.user.prenom);
    this.formData.append("email",this.user.email);
    this.formData.append("password",this.user.password);
    this.formData.append("photoUrl",this.image);
    this.formData.append("role",this.user.role);
    
    console.log(this.image);
    this.medecinservice.ajouteruser(this.formData)
    .subscribe(data=>{
          this.medecinservice.ajouterMedecin(this.user)
          .subscribe(data=>{
            this.getall();
            this.toastr.success("Opération terminée avec succès","", {
              timeOut: 3500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-left'
            })
            this.router.navigate(['/medecins']);
          },err=>{
            this.toastr.error(err.error.message,"Erreur", {
              timeOut: 3500,
              progressBar: true,
              progressAnimation: 'increasing',
              positionClass: 'toast-top-left'
            })
          })
    },err=>{
      this.toastr.error(err.error.message,"Erreur", {
        timeOut: 3500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-left'
      })
    })

  }


  //test drag input

  onDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = true;
    //console.log('Drag over');
    
  }

  onDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
    //console.log('Drag leave');
  }

  onDrop(event: any) {
    // event.preventDefault();
    // event.stopPropagation();
    // let droppedFiles = event.dataTransfer.files;
    // if(droppedFiles.length > 0) {
    //   this.onDroppedFile(droppedFiles)
    // }
    // this.isActive = false;
    // alert("ondrop");
    if(event.target.files.length>0){
     
      // this.formData.append('phoUrl',event.target.files[0]); 
      const file=event.target.files[0];
      this.image=file;
      this.nomImage=file.name;
      this.imageArea=false;

      // console.log(this.image);
      var reader=new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e:any)=>{
        this.url=e.target.result;
      }
      console.log(this.image);
      
    } 
  }

  // onDroppedFile(droppedFiles: any) {
  //   let formData = new FormData();
  //   for(let item of droppedFiles) {
  //     formData.append('userfiles', item);
  //   }

  //   this.fileUploadService.fileUpload(formData).subscribe(
  //     result => {
  //       this.upload = result;
  //     }
  //   )
  // }

  onSelectedFile(event: any) {
    
     if(event.target.files.length>0){
     
      // this.formData.append('phoUrl',event.target.files[0]); 
      const file=event.target.files[0];
      this.image=file;
      this.nomImage=file.name;
      this.imageArea=false;


      
      var reader=new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e:any)=>{
        this.url=e.target.result;
      }

     
    
    } 
    

  }

  removeImage(){
    this.imageArea=true;
    this.nomImage="";
  }

}
