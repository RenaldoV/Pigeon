import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ContactGroupDialogComponent } from './contact-group-dialog/contact-group-dialog.component';

@Component({
  selector: 'app-contact-groups',
  templateUrl: './contact-groups.component.html',
  styleUrls: ['./contact-groups.component.scss']
})
export class ContactGroupsComponent implements OnInit {
  allCGs: any[] = [];
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  addCG(cg?) {
    let index = -1;
    const dialConfig = new MatDialogConfig();
    dialConfig.disableClose = true;
    dialConfig.autoFocus = true;
    if (cg) {
      dialConfig.data = cg;
      index = this.allCGs.indexOf(cg);
    }
    const dialogRef = this.dialog.open(ContactGroupDialogComponent, dialConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (index > -1) {
          this.allCGs[index] = res;
        } else {
          this.allCGs.push(res);
        }
      }
    });
  }
}
