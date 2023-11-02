export interface Ticket {
    id: string;           
    title: string;        // Title or brief description of the issue/request
    description: string;  // Detailed description of the issue/request
    requesterName: string; // Name of the person who submitted the ticket
    requesterEmail: string; // Email of the person who submitted the ticket
    status: TicketStatus; // Current status of the ticket (e.g., Open, In Progress, Closed)
    createdDate: Date;    // Date and time when the ticket was created
    resolvedDate?: Date;  // Date and time when the ticket was resolved (optional)
    
  }
  
  export enum TicketStatus {
    Open = 'Open',
    InProgress = 'InProgress',
    Closed = 'Closed',
  }
  