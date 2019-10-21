import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts = [
    {
      _id : '5d5e667f05ecfb0a58bd39f3',
      title : 'Mr.',
      name : 'Ronnie',
      surname : 'Van Dyk',
      cell : '0781553936',
      email : 'ronnie@georgetown.co.za',
      type : 'Agent',
      verified : false,
      passwordHash : '$2b$10$tPHd5y9ZTh1zYndXcoCQt.EBq9l4yDQ6pi/7bcHKxkNEvip0UDpQK'
    },
    {
      _id : '5d5e670005ecfb0a58bd39f5',
      title : 'Mr.',
      name : 'Ryno',
      surname : 'Coetzee',
      cell : '0676177384',
      email : 'ryno@profectuscapital.co.zaaa',
      type : 'Seller',
      verified : false,
      passwordHash : '$2b$10$iopqovrdY.wu0uEJCI6Bi.v9II0aRY5ICLfBjK4ApWsJBWfgHyKPC'
    },
    {
      _id : '5d5f9917ccfaec65beee9e90',
      title : 'Mr.',
      name : 'Raphael',
      surname : 'Segal',
      cell : '0676177384',
      email : 'raphaels@legalinteract.co.za',
      type : 'Seller',
      verified : false,
      passwordHash : '$2b$10$iopqovrdY.wu0uEJCI6Bi.v9II0aRY5ICLfBjK4ApWsJBWfgHyKPC'
    }
  ];
  constructor() { }

  getContacts(): Observable<any> {
    return of(this.contacts);
  }

  getAllContactNames() {
    const contactNames = this.contacts.map(ct => {
      return {name: ct.name};
    });
    return of(contactNames);
  }

  searchContacts(terms: Observable<string>)  {
    return terms
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        switchMap(term => this.searchEntries(term))
      );
  }
  searchEntries(term): Observable<any[]> {
    return of(this.find(this.contacts, term));
  }

  find(items, text) {
    text = text.toLowerCase();
    text = text.split(' ');
    return items.filter((item) => {
      return text.every((el) => {
        if (!item.email) {
          item.email = '';
        }
        if (!item.cell) {
          item.cell = '';
        }
        return item.name.toLowerCase().indexOf(el) > -1 || item.cell.indexOf(el) > -1 || item.email.toLowerCase().indexOf(el) > -1 || item.type.toLowerCase().indexOf(el) > -1;
      });
    });
  }
}
