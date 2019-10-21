import { GlobalValidators } from './../../Common/Validators/globalValidators';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { LoaderService } from 'src/app/Common/Loader';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {
  userForm: FormGroup;
  existing = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    public loaderService: LoaderService,
    private matSnack: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createUserForm();
    if (data) {
      if (data.existing) {
        this.existing = true;
        this.userForm.patchValue(data);
        this.email.clearAsyncValidators();
        this.email.updateValueAndValidity();
      } else if (data.new) {
        this.userForm.patchValue(data);
      }
    }
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  createUserForm() {
    this.userForm = this.fb.group({
      _id: [null],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      cell: ['', [GlobalValidators.cellRegex]],
      email: ['', [GlobalValidators.validEmail]]
    });
  }
  get name() {
    return this.userForm.get('name');
  }
  get surname() {
    return this.userForm.get('surname');
  }
  get cell() {
    return this.userForm.get('cell');
  }
  get email() {
    return this.userForm.get('email');
  }
  submitUser() {
    if (this.userForm.valid) {
      delete this.userForm.value._id;
      /* this.contactService.createContact(this.userForm.value)
        .subscribe(res => {
          if (res) {
            this.matSnack.open('Contact added successfully');
            this.dialogRef.close(res);
          } else {
            const sb = this.matSnack.open('Contact not created successful', 'retry');
            sb.onAction().subscribe(() => {
              this.submitContact();
            });
          }
        }, err => {
          const sb = this.matSnack.open('Contact not created successful', 'retry');
          sb.onAction().subscribe(() => {
            this.submitContact();
          });
          console.log(err);
        }); */
    }
  }
  updateUser() {
    if (this.userForm.valid) {
      /* this.contactService.updateContact(this.userForm.value)
        .subscribe(res => {
          if (res) {
            this.matSnack.open('Contact updated successfully');
            this.dialogRef.close(res);
          } else {
            const sb = this.matSnack.open('Contact not updated successful', 'retry');
            sb.onAction().subscribe(() => {
              this.updateContact();
            });
          }
        }, err => {
          const sb = this.matSnack.open('Contact not updated successful', 'retry');
          sb.onAction().subscribe(() => {
            this.updateContact();
          });
          console.log(err);
        }); */
    }
  }
  onEmailChange() {
    if (this.existing) {
      if (this.email.value !== this.data.email) {
        this.email.setAsyncValidators(this.shouldBeUnique.bind(this));
        this.email.updateValueAndValidity();
      } else {
        this.email.clearAsyncValidators();
        this.email.updateValueAndValidity();
      }
    } else {
      if (this.email.value !== '') {
        this.email.setAsyncValidators(this.shouldBeUnique.bind(this));
      } else {
        this.email.clearAsyncValidators();
      }
    }
  }

  shouldBeUnique(control: AbstractControl): Promise<ValidationErrors> | null {
    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === '') {
          resolve(null);
        } else {
          /* this.contactService.getContactByEmail(control.value).subscribe((res) => {
            if (!res) {
              resolve(null);
            } else {
              resolve({'emailNotUnique': true});
            }
          }); */
        }
      }, 100);
    });
    return q;
  }
}
