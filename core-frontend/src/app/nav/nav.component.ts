import { MatDialogConfig, MatDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { TaskDialogComponent } from '../tasks/task-dialog/task-dialog.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  config = {
    panels: [
      { name: 'Help', description: 'Find help', icon: 'fas fa-question-circle fa-2x'},
      { name: 'Search', description: 'Search everywhere', icon: 'fas fa-search fa-2x'},
      { name: 'Add Task', description: 'Add Task', icon: 'fas fa-folder-plus fa-2x'}
    ]
  };
  constructor(
    private dialog: MatDialog
  ) { }

  navbarOpen = false;

  ngOnInit() {
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  callMethod(e) {
    if (e === 'Add Task') {
      this.newTask();
    }
  }

  newTask() {
    const dialConfig = new MatDialogConfig();
    dialConfig.disableClose = true;
    dialConfig.autoFocus = true;
    const dialogRef = this.dialog.open(TaskDialogComponent, dialConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log(res);
      }
    });
  }

}
