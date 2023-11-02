import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketsService } from 'src/app/Services/tickets.service';
import { Ticket, TicketStatus } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-edit-tickets',
  templateUrl: './edit-tickets.component.html',
  styleUrls: ['./edit-tickets.component.css']
})
export class EditTicketsComponent {
  ticketStatusOptions: TicketStatus[] = [
    TicketStatus.Open,
    TicketStatus.InProgress,
    TicketStatus.Closed
  ];

  editTicketReq: Ticket = {
    id: '',
    title: '',
    description: '',
    requesterName: '',
    requesterEmail: '',
    status: TicketStatus.Open, 
    createdDate: new Date(),  
    resolvedDate: undefined   
  };
  constructor(private route:ActivatedRoute,private ticketService:TicketsService,private router:Router) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params)=> {
        const id= params.get('id');
        if(id){
            this.ticketService.getTicket(id)
            .subscribe({
              next:( response) =>{
                this.editTicketReq=response;
              }
            })
        }
      }
     
    })
  }
  updateTicket(){
     this.ticketService.updateTicket(this.editTicketReq.id,this.editTicketReq)
     .subscribe({
      next:(response)=>{
        this.router.navigate(['tickets']);
      }
     })
  }
  deleteTicket(id:string){
    this.ticketService.deleteTicket(id)
    .subscribe({
      next:(response)=>{
        this.router.navigate(['tickets']);
      }
     })
  }
}

