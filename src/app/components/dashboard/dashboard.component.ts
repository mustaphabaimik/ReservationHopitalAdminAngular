import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import * as _ from 'lodash';
import { HopitalService } from 'src/app/services/hopital.service';
import { MedecinService } from 'src/app/services/medecin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  
  static:any=[];
  nbr:any;
  nbrUser:number;
  nbrSpeci:number;
  nbrReservation:number;
  nbrMedecin:number;
  specialities:any=[];
  medecins:any=[];
//   selectedSpec:String;
  constructor(private hopService:HopitalService,private MedecinService:MedecinService) { }
 
  ngOnInit(): void {

    

    this.MedecinService.getSpecialities()
    .subscribe(data=>{
      this.specialities=data;
      console.log("iciii");
      console.log(this.specialities);

       this.MedecinService.getmedecins(this.specialities[0].specialite)
        .subscribe(data=>{
            console.log(data);
            this.medecins=data;
        })
      
    })

    this.hopService.statNbrMedecin()
    .subscribe(data=>{
        this.nbr=data;
        this.nbrMedecin=this.nbr[0].nbr;
    })
     this.hopService.statisNbrReser()
     .subscribe(data=>{
         this.nbr=data;
         this.nbrReservation=this.nbr[0].nbr;
     })
     this.hopService.staticNbrUser()
     .subscribe(data=>{
       this.nbr=data;
       this.nbrUser=this.nbr[0].nbr;
       console.log(this.nbr[0].nbr);
     })

     this.hopService.statisSpecialite()
     .subscribe(data=>{
         this.nbr=data;
         this.nbrSpeci=this.nbr[0].nbr;
     })
      this.hopService.statisReserHop()
      .subscribe(data=>{   
        this.static=data;
        console.log(this.static);
          let hop=_.map(this.static,'hopital');
          let nbr=_.map(this.static,'nbr');
              var myChart = new Chart('myChart', {
                type: 'pie',
                data: {
                    labels: hop,
                    datasets: [{
                        label: '# of Votes',
                        data: nbr,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
      });
    
  }

  selectedSpec(e){
    

    this.MedecinService.getmedecins(e.target.value)
    .subscribe(data=>{
        console.log(data);
        this.medecins=data;
    })
  }
   
}
