import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ticket } from '../models/ticket.model';
@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(private http:HttpClient) { }
  getAllTickets():Observable<Ticket[]>{
    return this.http.get<Ticket[]>("https://localhost:7217"+'/api/Ticket');
  }
  addTicket(addTicketReq:Ticket):Observable<Ticket>{
    addTicketReq.id="00000000-0000-0000-0000-000000000000";
    return this.http.post<Ticket>("https://localhost:7217"+'/api/Ticket',addTicketReq);
  }
  getTicket(id:string):Observable<Ticket> {
    return this.http.get<Ticket>("https://localhost:7217"+'/api/Ticket/'+id);
  }
  updateTicket(id:string,updateTicketReq:Ticket):Observable<Ticket> {
    return this.http.put<Ticket>("https://localhost:7217"+'/api/Ticket/'+id,updateTicketReq);
  }
  deleteTicket(id:string):Observable<Ticket> {
      return this.http.delete<Ticket>("https://localhost:7217"+'/api/Ticket/'+id);
  }
}
