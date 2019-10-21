import { MatDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-milestone-dialog',
  templateUrl: './milestone-dialog.component.html',
  styleUrls: ['./milestone-dialog.component.scss']
})
export class MilestoneDialogComponent implements OnInit {

  milestoneForm: FormGroup;
  existing = false;
  constructor(
    private dialogRef: MatDialogRef<MilestoneDialogComponent>,
    private fb: FormBuilder
  ) {
    this.createMilestoneForm();
   }

  ngOnInit() {
  }

  close() {
    if (!this.milestoneForm.dirty) {
      this.dialogRef.close();
    } else {
      if (confirm('Are you sure you want to close? All progress will be lost?')) {
        this.dialogRef.close();
      }
    }
  }

  createMilestoneForm() {
    this.milestoneForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      emailMessage: ['', Validators.required],
      smsMessage: ['', Validators.required],
      sendEmail: [false],
      sendSMS: [false],
      alwaysAsk: [false],
      updatedBy: ['new'],
      position: ['']
    });
  }

  get name() {
    return this.milestoneForm.get('name');
  }
  get emailMessage() {
    return this.milestoneForm.get('emailMessage');
  }
  get smsMessage() {
    return this.milestoneForm.get('smsMessage');
  }
  get sendEmail() {
    return this.milestoneForm.get('sendEmail');
  }
  get sendSMS() {
    return this.milestoneForm.get('sendSMS');
  }
  get alwaysAsk() {
    return this.milestoneForm.get('alwaysAsk');
  }

  save() {
    const payload = this.milestoneForm.value;
    if (!this.existing) {
      delete payload._id;
    }
    this.dialogRef.close(this.milestoneForm.value);
  }

  insertNoti(e, msg, control, ctr) {
    e.preventDefault();
    const value = this.milestoneForm.get(control).value;
    if (ctr.selectionStart || ctr.selectionStart === 0) {
      if (ctr.selectionEnd || ctr.selectionEnd === 0) {
        const msgStart = value.substring(0, ctr.selectionStart);
        const msgEnd = value.substring(ctr.selectionEnd, value.length);
        this.milestoneForm.get(control).setValue(msgStart + msg + msgEnd);
      }
    }
  }

  onMilestoneChange(): void {
    if (this.milestoneForm.value.updatedBy !== 'new') {
      console.log('setting milestone as updated');
      this.milestoneForm.get('updatedBy').setValue('updated');
    }
  }

}
