import { MilestoneListDialogComponent } from './milestone-list-dialog/milestone-list-dialog.component';
import { MatDialogConfig, MatDialog, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoaderService } from '../Common/Loader';

@Component({
  selector: 'app-milestones',
  templateUrl: './milestones.component.html',
  styleUrls: ['./milestones.component.scss']
})
export class MilestonesComponent implements OnInit {
  MilestoneListForm: FormGroup;
  allLists;
  constructor(
    private matSnack: MatSnackBar,
    private fb: FormBuilder,
    public loaderService: LoaderService,
    private dialog: MatDialog
  ) {
    this.createMilestoneListForm();
  }

  ngOnInit() {

  }

  // ================== MILESTONE FUNCTIONS ==============================
  createMilestoneListForm() {
    this.MilestoneListForm = this.fb.group({
      list: this.fb.array([]),
    });
  }
  get list(): FormArray {
    return this.MilestoneListForm.get('list') as FormArray;
  }
  getMilestones(i): FormArray {
    return this.list.at(i).get('milestones') as FormArray;
  }
  addMilestoneList() {
    const msl = this.fb.group({
      _id: [''],
      title: ['', Validators.required],
      milestones: this.fb.array([]),
      updatedBy: ['new']
    });
    const arrayControl = <FormArray>this.list;
    arrayControl.push(msl);
    this.addMilestone(this.list.length - 1);
  }
  addMilestone(i) {
    const ms = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      number: new FormControl({value: this.getMilestones(i).length + 1}),
      emailMessage: ['', Validators.required],
      smsMessage: ['', Validators.required],
      sendEmail: [false],
      sendSMS: [false],
      alwaysAsk: [false],
      updatedBy: ['new']
    });
    const arrayControl = <FormArray>this.list.at(i).get('milestones');
    arrayControl.push(ms);
  }
  removeMilestoneList (e, i) { // remove result from form array
    e.stopPropagation();
    e.preventDefault();
    if (confirm('Are you sure you want to delete this list and all milestones associated with it?')) {
      const list = this.list.at(i);
      const control = <FormArray>this.list;
      if (list.value.updatedBy === 'new') {
        this.matSnack.open('List removed successfully');
        control.removeAt(i);
      } else {
        /* this.adminService.deleteList(list.value._id)
          .subscribe(res => {
            if (res) {
              this.matSnack.open('List removed successfully');
              control.removeAt(i);
            } else {
              const sb = this.matSnack.open('Delete unsuccessful', 'retry');
              sb.onAction().subscribe(() => {
                this.removeMilestoneList(e, i);
              });
            }
          }, err => {
            const sb = this.matSnack.open('Delete unsuccessful', 'retry');
            sb.onAction().subscribe(() => {
              this.removeMilestoneList(e, i);
            });
            console.log(err);
          }); */
      }
    }
  }
  removeMilestone (e, i, k) { // remove result from form array
    e.stopPropagation();
    e.preventDefault();
    if (confirm('Are you sure you want to delete this milestone?')) {
      const milestone = this.getMilestones(i).at(k);
      if (milestone.value.updatedBy !== 'new') {
        /* this.adminService.deleteMilestone(milestone.value._id, this.list.at(i).get('_id').value)
          .subscribe(res => {
            if (res) {
              const control = <FormArray>this.getMilestones(i);
              control.removeAt(k);
              this.matSnack.open('Milestone removed successfully');
            } else {
              const sb = this.matSnack.open('Delete unsuccessful', 'retry');
              sb.onAction().subscribe(() => {
                this.removeMilestone(e, i, k);
              });
            }
          }, err => {
            const sb = this.matSnack.open('Delete unsuccessful', 'retry');
            sb.onAction().subscribe(() => {
              this.removeMilestone(e, i, k);
            });
            console.log(err);
          }); */
      } else {
        const control = <FormArray>this.getMilestones(i);
        control.removeAt(k);
        this.matSnack.open('Milestone removed successfully');
      }
    }
  }
  insertNoti(e, i, k, msg, control, ctr) {
    e.preventDefault();
    const value = this.getMilestones(i).at(k).get(control).value;
    if (ctr.selectionStart || ctr.selectionStart === 0) {
      if (ctr.selectionEnd || ctr.selectionEnd === 0) {
        const msgStart = value.substring(0, ctr.selectionStart);
        const msgEnd = value.substring(ctr.selectionEnd, value.length);
        this.getMilestones(i).at(k).get(control).setValue(msgStart + msg + msgEnd);
      }
    }
    // this.getMilestones(i).at(k).get(control).setValue(this.getMilestones(i).at(k).get(control).value + msg);
  }
  getAllLists() {
    /* this.adminService.getAllMilestoneLists()
      .subscribe(res => {
        this.allLists = res;
        this.patchLists(res);
      }); */
  }
  patchLists(lists) {
    lists.forEach((list, i) => {
      const msl = this.fb.group({
        _id: [''],
        title: ['', Validators.required],
        milestones: this.fb.array([]),
        updatedBy: ['new']
      });
      const arrayControl = <FormArray>this.list;
      msl.patchValue(list);
      list.milestones.forEach((m, k) => {
        const ms = this.fb.group({
          _id: [''],
          name: ['', Validators.required],
          number: new FormControl({value: m.number ? m.number : k + 1}),
          emailMessage: ['', Validators.required],
          smsMessage: ['', Validators.required],
          sendEmail: [false],
          sendSMS: [false],
          alwaysAsk: [false],
          updatedBy: ['']
        });
        const mArrayControl = <FormArray>msl.get('milestones');
        ms.patchValue(m);
        mArrayControl.push(ms);
      });
      arrayControl.push(msl);
    });
  }
  onMilestoneChange(i, k): void {
    if (this.getMilestones(i).at(k).value.updatedBy !== 'new') {
      console.log('setting milestone as updated');
      this.getMilestones(i).at(k).get('updatedBy').setValue('updated');
    }
  }
  onListChange(i): void {
    if (this.list.at(i).value.updatedBy !== 'new') {
      console.log('setting list as updated');
      this.list.at(i).get('updatedBy').setValue('updated');
    }
  }
  submitMilestones(i) {
    const list = this.list.at(i).value;
    if (this.list.at(i).valid) {
      if (list.updatedBy === 'new') { // new list save to db
        /* list.updatedBy = this.auth.getID(); */
        list.milestones.forEach(m => {
          m.updatedBy = list.updatedBy;
        });
        /* this.adminService.createNewList(list)
          .subscribe(res => {
            if (res) {
              // Insert all milestones and append to list
              this.adminService.createMilestones(list.milestones, res._id)
                .subscribe(l => {
                  if (l) {
                    // if milestones added successfully return the list.
                    this.list.at(i).patchValue(l);
                    this.matSnack.open('Milestones saved successfully');
                  } else {
                    const sb = this.matSnack.open('Save unsuccessful', 'retry');
                    sb.onAction().subscribe(() => {
                      this.submitMilestones(i);
                    });
                  }
                }, err => {
                  const sb = this.matSnack.open('Save unsuccessful', 'retry');
                  sb.onAction().subscribe(() => {
                    this.submitMilestones(i);
                  });
                  console.log(err);
                });
            } else {
              const sb = this.matSnack.open('Save unsuccessful', 'retry');
              sb.onAction().subscribe(() => {
                this.submitMilestones(i);
              });
            }
          }, err => {
            const sb = this.matSnack.open('Save unsuccessful', 'retry');
            sb.onAction().subscribe(() => {
              this.submitMilestones(i);
            });
            console.log(err);
          }); */
      } else if (list.updatedBy === 'updated') {
        /* list.updatedBy = this.auth.getID(); */
        list.milestones.forEach((m, k) => {
          if (m.updatedBy === 'updated') { // existing milestone needs to be updated
            m.updatedBy = list.updatedBy;
            /* this.adminService.updateMilestone(m)
              .subscribe(res => {
                if (res) {
                  console.log('milestone update successful');

                } else {
                  alert('Oops, something went wrong');
                }
              }, err => {
                console.log(err);
              }); */
          } else if (m.updatedBy === 'new') { // new milestone needs to be pushed
            m.updatedBy = list.updatedBy;
            /* this.adminService.createMilestone(m, list._id)
              .subscribe(res => {
                if (res) {
                  console.log('milestone create successful: \n');
                } else {
                  alert('Oops, something went wrong');
                }
              }, err => {
                console.log(err);
              }); */
          }
        });
        /* this.adminService.updateList(list)
          .subscribe(res => {
            this.matSnack.open('List saved successfully');
            this.list.at(i).patchValue(list);
          }, err => {
            const sb = this.matSnack.open('Save unsuccessful', 'retry');
            sb.onAction().subscribe(() => {
              this.submitMilestones(i);
            });
            console.log(err);
          }); */
        this.list.at(i).patchValue(list);
      }
    }
  }

  addML() {
    const dialConfig = new MatDialogConfig();
    dialConfig.disableClose = true;
    dialConfig.autoFocus = true;
    dialConfig.data = {new: true};
    const dialogRef = this.dialog.open(MilestoneListDialogComponent, dialConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log(res);
      }
    });
  }
  // ================== MILESTONE FUNCTIONS ==============================



}


// TODO: SORTABLE DROPDOWNS https://stackblitz.com/edit/angular-bttxvh?file=src%2Fapp%2Fpanels-component%2Fpanels.ts
