import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TicketsService } from 'src/app/Services/tickets.service';
import { Ticket, TicketStatus } from 'src/app/models/ticket.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import the necessary classes

@Component({
  selector: 'app-add-ticket',
  templateUrl: './add-ticket.component.html',
  styleUrls: ['./add-ticket.component.css']
})
export class AddTicketComponent implements OnInit {
  
  ticketStatusOptions: TicketStatus[] = [
    TicketStatus.Open,
    TicketStatus.InProgress,
    TicketStatus.Closed
  ];

  

  ticketForm: FormGroup; 
  constructor(
    private ticketService: TicketsService,
    private router: Router,
    private formBuilder: FormBuilder 
  ) {
    this.ticketForm = this.formBuilder.group({
      id:[null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      requesterName: ['', [Validators.required, Validators.minLength(2)]],
      requesterEmail: ['', [Validators.required, Validators.email]],
      status: [null, Validators.required],
      createdDate: [new Date(), Validators.required],
      resolvedDate: [null]
    });
  }

  ngOnInit(): void {}

  addTicketReq() {
    if (this.ticketForm.valid) {
      const newTicket: Ticket = this.ticketForm.value;
      this.ticketService.addTicket(newTicket).subscribe({
        next: (ticket) => {
          this.router.navigate(['tickets']);
        }
      });
    }
  }
}
