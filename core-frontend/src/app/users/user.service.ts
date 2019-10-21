import { Observable, of } from 'rxjs/index';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = [
    {
      _id : '5c10f4e3c259a10844ac33a6',
      passwordHash : '$2b$10$pTR/uHLHa0A8V2hDm1/zo.57mquB..25cKXbfGzCyUJFgFap44tZe',
      company : 'CBI Attorneys',
      email : 'renaldovd@gmail.com',
      role : 'admin',
      name : 'Renaldo',
      cell : '0781553936',
      surname : 'Coetzee',
      verified : true,
      __v : 0,
      milestoneLists : [
          '5c11fb9a199a491d88e98e83',
          '5c3e21debda4c015a47a4366'
      ],
      properties : '5c1204b2199a491d88e98eac',
      contacts : [
          '5d5e667f05ecfb0a58bd39f3',
          '5d5e670005ecfb0a58bd39f5',
          '5d5e679705ecfb0a58bd39f6',
          '5d5f9917ccfaec65beee9e90',
          '5d5f9e90ccfaec65beee9e93',
          '5d93427dfd0d8c0d1d45359a',
          '5d93567350f3550ebb595758',
          '5d9357a7918d770ee4c8d951',
          '5d9358a73697cc0ef6abcd79'
      ],
      files : [
          '5d5e679f05ecfb0a58bd39f7',
          '5d5f9956ccfaec65beee9e91',
          '5d5f9ecaccfaec65beee9e94',
          '5d9358af3697cc0ef6abcd7a'
      ],
      forgotPassword : {}
    },
    {
      _id : '5c10f4e3c259a10844ac33a6',
      passwordHash : '$2b$10$pTR/uHLHa0A8V2hDm1/zo.57mquB..25cKXbfGzCyUJFgFap44tZe',
      company : 'CBI Attorneys',
      email : 'renaldovd@gmail.com',
      role : 'admin',
      name : 'Ryno',
      cell : '0781553936',
      surname : 'Coetzee',
      verified : true,
      __v : 0,
      milestoneLists : [
          '5c11fb9a199a491d88e98e83',
          '5c3e21debda4c015a47a4366'
      ],
      properties : '5c1204b2199a491d88e98eac',
      contacts : [
          '5d5e667f05ecfb0a58bd39f3',
          '5d5e670005ecfb0a58bd39f5',
          '5d5e679705ecfb0a58bd39f6',
          '5d5f9917ccfaec65beee9e90',
          '5d5f9e90ccfaec65beee9e93',
          '5d93427dfd0d8c0d1d45359a',
          '5d93567350f3550ebb595758',
          '5d9357a7918d770ee4c8d951',
          '5d9358a73697cc0ef6abcd79'
      ],
      files : [
          '5d5e679f05ecfb0a58bd39f7',
          '5d5f9956ccfaec65beee9e91',
          '5d5f9ecaccfaec65beee9e94',
          '5d9358af3697cc0ef6abcd7a'
      ],
      forgotPassword : {}
    }
  ];



  constructor() { }

  getUserNames(): Observable<any> {
    return of(this.users.map(us => {
      return {name: us.name};
    }));
  }

  getName(): Observable<any> {
    return of(this.users[0].name);
  }
}
