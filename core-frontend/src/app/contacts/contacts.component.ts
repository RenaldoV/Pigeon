import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  allContacts: any[] = [];
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  addContact(ct?) {
    let index = -1;
    const dialConfig = new MatDialogConfig();
    dialConfig.disableClose = true;
    dialConfig.autoFocus = true;
    if (ct) {
      dialConfig.data = ct;
      index = this.allContacts.indexOf(ct);
    }
    const dialogRef = this.dialog.open(ContactDialogComponent, dialConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (index > -1) {
          this.allContacts[index] = res;
        } else {
          this.allContacts.push(res);
        }
      }
    });
  }
}
