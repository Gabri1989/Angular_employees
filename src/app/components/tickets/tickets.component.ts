import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/Services/tickets.service';
import { Ticket } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit{
  tickets: Ticket[]=[];
  


  constructor(private ticketsService:TicketsService) {}
  ngOnInit(): void {
    this.ticketsService.getAllTickets()
    .subscribe(
      {
        next: (tickets) =>{
          this.tickets=tickets;
        },
        error: (response) => {
          console.log(response);
        }
      }
    )
  }
}
