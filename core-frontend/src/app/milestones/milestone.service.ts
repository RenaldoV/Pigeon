import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {

  milestoneLists = [
    {
      _id : '5c11fb9a199a491d88e98e83',
      milestones : [
        {
          _id: '5c11fb9a199a491d88e98e84',
          name : 'Instruction Received',
          emailMessage : 'Good day *contact_name*. Transfer: *property_description*. We received instruction to attend to the above transfer. *sec_names* will be in contact with you shortly to request FICA documents. CBI Attorneys- Tel: (011) 450-3734 or *sec_names*,  *sec_emails*',
          smsMessage : 'Good day *contact_name*. Transfer: *property_description*. We received instruction to attend to the above transfer. *sec_names* will be in contact with you shortly to request FICA documents. CBI Attorneys- Tel: (011) 450-3734 or *sec_names*,  *sec_emails*',
          sendEmail : false,
          sendSMS : false,
          updatedBy : '5c10f4e3c259a10844ac33a6',
          __v : 0,
          createdAt : '2018-12-13T06:26:34.919Z',
          updatedAt : '2019-01-29T11:50:48.984Z',
          alwaysAsk : true,
          number : 1
        },
        {
          _id: '5c11fbb9199a491d88e98e85',
          name : 'FICA documents requested from Seller/s',
          emailMessage : 'Good day *contact_name*. Transfer: *property_description*. We received instruction to attend to the above transfer. *sec_names* will be in contact with you shortly to request FICA documents. CBI Attorneys- Tel: (011) 450-3734 or *sec_names*,  *sec_emails*',
          smsMessage : 'Good day *contact_name*. Transfer: *property_description*. We received instruction to attend to the above transfer. *sec_names* will be in contact with you shortly to request FICA documents. CBI Attorneys- Tel: (011) 450-3734 or *sec_names*,  *sec_emails*',
          sendEmail : false,
          sendSMS : false,
          updatedBy : '5c10f4e3c259a10844ac33a6',
          __v : 0,
          createdAt : '2018-12-13T06:26:34.919Z',
          updatedAt : '2019-01-29T11:50:48.984Z',
          alwaysAsk : true,
          number : 1
        }
      ],
      title : 'Transfer',
      updatedBy : '5cc40decee44321eb867d7f2',
      createdAt : '2018-12-13T06:26:34.873Z',
      updatedAt : '2019-08-22T06:19:49.075Z',
      __v : 0
    },
    {
      _id : '5c3e21debda4c015a47a4366',
      milestones : [
        {
          _id: '5c11fb9a199a491d88e98e84',
          name : 'Instruction Received',
          emailMessage : 'Good day *contact_name*. Transfer: *property_description*. We received instruction to attend to the above transfer. *sec_names* will be in contact with you shortly to request FICA documents. CBI Attorneys- Tel: (011) 450-3734 or *sec_names*,  *sec_emails*',
          smsMessage : 'Good day *contact_name*. Transfer: *property_description*. We received instruction to attend to the above transfer. *sec_names* will be in contact with you shortly to request FICA documents. CBI Attorneys- Tel: (011) 450-3734 or *sec_names*,  *sec_emails*',
          sendEmail : false,
          sendSMS : false,
          updatedBy : '5c10f4e3c259a10844ac33a6',
          __v : 0,
          createdAt : '2018-12-13T06:26:34.919Z',
          updatedAt : '2019-01-29T11:50:48.984Z',
          alwaysAsk : true,
          number : 1
        },
        {
          _id: '5c11fbb9199a491d88e98e85',
          name : 'FICA documents requested from Seller/s',
          emailMessage : 'Good day *contact_name*. Transfer: *property_description*. We received instruction to attend to the above transfer. *sec_names* will be in contact with you shortly to request FICA documents. CBI Attorneys- Tel: (011) 450-3734 or *sec_names*,  *sec_emails*',
          smsMessage : 'Good day *contact_name*. Transfer: *property_description*. We received instruction to attend to the above transfer. *sec_names* will be in contact with you shortly to request FICA documents. CBI Attorneys- Tel: (011) 450-3734 or *sec_names*,  *sec_emails*',
          sendEmail : false,
          sendSMS : false,
          updatedBy : '5c10f4e3c259a10844ac33a6',
          __v : 0,
          createdAt : '2018-12-13T06:26:34.919Z',
          updatedAt : '2019-01-29T11:50:48.984Z',
          alwaysAsk : true,
          number : 1
        }
      ],
      title : 'Bond',
      updatedBy : '5cc40decee44321eb867d7f2',
      createdAt : '2018-12-13T06:26:34.873Z',
      updatedAt : '2019-08-22T06:19:49.075Z',
      __v : 0
    }
  ];

  constructor() { }

  getAllMilestoneLists(): Observable<any> {
    return of(this.milestoneLists);
  }
}
