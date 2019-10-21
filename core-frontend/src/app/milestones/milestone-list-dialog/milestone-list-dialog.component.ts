import { MilestoneDialogComponent } from './../milestone-dialog/milestone-dialog.component';
import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatStepper, MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-milestone-list-dialog',
  templateUrl: './milestone-list-dialog.component.html',
  styleUrls: ['./milestone-list-dialog.component.scss']
})
export class MilestoneListDialogComponent implements OnInit {
  milestones = [];
  MLForm: FormGroup;
  public options = { animation: 150 };
  public myImage: HTMLElement;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MilestoneListDialogComponent>,
    private matSnack: MatSnackBar,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createMLForm();
  }

  ngOnInit() {
  }

  close() {
    if (!this.MLForm.dirty) {
      this.dialogRef.close();
    } else {
      if (confirm('Are you sure you want to close? All progress will be lost?')) {
        this.dialogRef.close();
      }
    }
  }

  createMLForm() {
    this.MLForm = this.fb.group({
      title: ['', Validators.required],
      description: ['']
    });
  }

  get title() {
    return this.MLForm.get('title');
  }
  get description() {
    return this.MLForm.get('description');
  }

  matCurrentStep(stepper: MatStepper) {
    switch (stepper.selectedIndex) {
      case 0:
        return 'Next';
      case 1:
        return 'Save';
    }
  }
  stepNext(stepper: MatStepper) {
    switch (stepper.selectedIndex) {
      case 0:
        this.goForward(stepper);
        break;
      case 1:
        this.save();
        break;
    }
  }
  hasPrevious(stepper: MatStepper): boolean {
    switch (stepper.selectedIndex) {
      case 0:
        return false;
      case 1:
        return true;
    }
  }
  goForward(stepper: MatStepper) {
    stepper.next();
  }
  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  addMilestone() {
    const dialConfig = new MatDialogConfig();
    dialConfig.disableClose = true;
    dialConfig.autoFocus = true;
    dialConfig.data = {new: true};
    const dialogRef = this.dialog.open(MilestoneDialogComponent, dialConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.milestones.push(res);
      }
    });
  }

  save() {
    const payload = this.MLForm.value;
    payload.milestones = this.milestones;
    console.log(payload);
  }

  public started(e) {
    this.myImage = e.srcElement.getElementsByTagName('mat-expansion-panel-header')[0].cloneNode(true);
    document.body.appendChild(this.myImage);
    e.dataTransfer.setDragImage(this.myImage, 0, 0);
  }

  public ended() {
    document.body.removeChild(this.myImage);
  }

}
