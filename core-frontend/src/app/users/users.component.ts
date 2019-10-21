import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  allUsers: any[] = [];
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  addUser(us?) {
    let index = -1;
    const dialConfig = new MatDialogConfig();
    dialConfig.disableClose = true;
    dialConfig.autoFocus = true;
    if (us) {
      dialConfig.data = us;
      index = this.allUsers.indexOf(us);
    }
    const dialogRef = this.dialog.open(UserDialogComponent, dialConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if (index > -1) {
          this.allUsers[index] = res;
        } else {
          this.allUsers.push(res);
        }
      }
    });
  }

}
