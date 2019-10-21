import { ContactService } from './../../contacts/contact.service';
import { ContactDialogComponent } from './../../contacts/contact-dialog/contact-dialog.component';
import { GlobalValidators } from './../../Common/Validators/globalValidators';
import { LoaderService } from 'src/app/Common/Loader';

import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {
  ErrorStateMatcher,
  MAT_DIALOG_DATA,
  MatAutocomplete,
  MatAutocompleteSelectedEvent, MatAutocompleteTrigger, MatDialog, MatDialogConfig,
  MatDialogRef,
  MatSnackBar
} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs/index';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-contact-group-dialog',
  templateUrl: './contact-group-dialog.component.html',
  styleUrls: ['./contact-group-dialog.component.scss']
})
export class ContactGroupDialogComponent implements OnInit {
  CGForm: FormGroup;
  existing = false;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredContacts: Observable<any[]>;
  allContacts: any[] = [];
  contactsForEntities: any[] = [];
  matcher = new ErrorStateMatcher();
  @ViewChild('conPersonInput', {static: true}) conPersonInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: true}) conPersonAutoComp: MatAutocomplete;
  @ViewChild('conTrigger', {static: true}) conInput: MatAutocompleteTrigger;

  filteredFiles: Observable<any[]>;
  allFiles: any[] = [];
  selectedFiles: any[] = [];
  @ViewChild('fileInput', {static: true}) fileInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoFiles', {static: true}) autoFiles: MatAutocomplete;
  @ViewChild('fileTrigger', {static: true}) fileInputTrigger: MatAutocompleteTrigger;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ContactGroupDialogComponent>,
    public loaderService: LoaderService,
    private matSnack: MatSnackBar,
    private contactService: ContactService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createCGForm();
    if (this.data) {
      if (this.data.entity) {
        this.existing = true;
      }
      if (this.data.allContacts) {
        this.allContacts = this.data.allContacts;
      } else {
        this.getContacts();
      }
    } else {
      this.getContacts();
    }
    this.getFiles();
    if (this.existing) {
      this.patchEntity();
      this.name.clearAsyncValidators();
      this.name.updateValueAndValidity();
    }
    if (this.data) {
      if (this.data.name) {
        this.name.setValue(this.data.name);
      }
    }
  }

  ngOnInit() {
  }
  close() {
    this.dialogRef.close();
  }
  getFiles() {
    /* this.fileService.getAllFileNames()
      .subscribe(res => {
        this.allFiles = res;
        this.filteredFiles = this.files.valueChanges.pipe(
          startWith(null),
          map((f: string | null) => f ? this._filteredFiles(f) : this._filteredFiles('')));
      }); */
  }
  getContacts() {
    this.contactService.getAllContactNames()
      .subscribe(res => {
        if (res) {
          this.allContacts = res;
          this.filteredContacts = this.contacts.valueChanges.pipe(
            startWith(null),
            map((con: string | null) => con ? this._filteredContacts(con) : this._filteredContacts('')));
        }
      }, err => {
        console.log(err);
      });
  }
  createCGForm() {
    this.CGForm = this.fb.group({
      _id: [],
      name: ['', Validators.required],
      address: ['', Validators.required],
      telephone: ['', [Validators.required, GlobalValidators.cellRegex]],
      contacts: ['', Validators.required], // array of contact ids
      conPersChips: ['', Validators.required], // used for chips control
      website: ['', Validators.required],
      files: [''],
      fileChips: ['']
    });
  }
  patchEntity() {
    this.CGForm.patchValue(this.data.entity);
    this.contactsForEntities = this.data.entity.contacts;
    this.conPersChips.setValue(this.contactsForEntities);
    this.selectedFiles = this.data.entity.files;
    this.fileChips.setValue(this.selectedFiles);
  }
  get name() {
    return this.CGForm.get('name');
  }
  get address() {
    return this.CGForm.get('address');
  }
  get telephone() {
    return this.CGForm.get('telephone');
  }
  get conPersChips() {
    return this.CGForm.get('conPersChips');
  }
  get website() {
    return this.CGForm.get('website');
  }
  get fileChips() {
    return this.CGForm.get('fileChips');
  }
  get files() {
    return this.CGForm.get('files');
  }
  get contacts() {
    return this.CGForm.get('contacts');
  }
  private _filteredContacts(value: string): string[] {
    const conNames = this.contactsForEntities.map(c => c.name);
    const filterValue = value.toLowerCase();
    let results = this.allContacts.filter(con => con.name.toLowerCase().indexOf(filterValue) === 0 && conNames.indexOf(con.name) === -1);
    if (results.length < 1) { // contact doesn't exist create new one.
      results = [{name: 'Would you like to add *' + value + '* as a new contact?', _id: 'new'}];
    }
    return results;
  }
  removeContactPerson(sec): void {
    const index = this.contactsForEntities.indexOf(sec);

    if (index >= 0) {
      this.contactsForEntities.splice(index, 1);
      this.conPersChips.setValue(this.contactsForEntities);
    }
    if (this.conPersChips.value.length < 1) {
      // no contacts chosen show error
      this.contacts.setValidators(Validators.required);
      this.contacts.updateValueAndValidity();
    }
  }
  selectedContactPerson(event: MatAutocompleteSelectedEvent): void {
    const selectedCon = {_id: event.option.value, name: event.option.viewValue};
    if (selectedCon._id === 'new') { // contact doesn't exist, create new
      const contactArr = selectedCon.name.split('*');
      const nameArr = contactArr[1].split(' ');
      const contact = {
        name: nameArr[0],
        surname: nameArr.length > 1 ? nameArr[1] : ''
      };
      this.createNewContactDialog(contact);
    } else {
      this.contactsForEntities.push(selectedCon);
      this.conPersonInput.nativeElement.value = '';
      this.contacts.setValue(null);
      this.conPersChips.setValue(this.contactsForEntities);
      this.contacts.clearValidators();
      this.contacts.updateValueAndValidity();
    }
  }
  private _filteredFiles(value: string): string[] {
    const fileNames = this.selectedFiles.map(f => f.fileRef);
    const filterValue = value.toLowerCase();
    return this.allFiles.filter(f => f.fileRef.toLowerCase().indexOf(filterValue) === 0 && fileNames.indexOf(f.fileRef) === -1);
  }
  removeFile(f): void {
    const index = this.selectedFiles.indexOf(f);
    if (this.existing) { // remove file from entity and entity from file in backend
      /* this.entityService.removeFileFromEntity(this.data.entity._id, f._id)
        .subscribe(res => {
          if (res) {
            this.selectedFiles.splice(index, 1);
            this.fileChips.setValue(this.selectedFiles);
            this.matSnack.open('File successfully removed from entity');
          }
        }); */
    } else {
      if (index >= 0) {
        this.selectedFiles.splice(index, 1);
        this.fileChips.setValue(this.selectedFiles);
      }
    }
  }
  selectedFile(event: MatAutocompleteSelectedEvent): void {
    const selectedF = {_id: event.option.value, fileRef: event.option.viewValue};
    if (this.existing) {
      /* this.entityService.addFileToEntity(this.data.entity._id, selectedF._id)
        .subscribe(res => {
          if (res) {
            this.selectedFiles.push(selectedF);
            this.fileInput.nativeElement.value = '';
            this.files.setValue(null);
            this.fileChips.setValue(this.selectedFiles);
            this.matSnack.open('File successfully added to entity');
          }
        }); */
    } else {
      this.selectedFiles.push(selectedF);
      this.fileInput.nativeElement.value = '';
      this.files.setValue(null);
      this.fileChips.setValue(this.selectedFiles);
    }
  }
  onFocus() {
    this.conInput._onChange('');
    this.conInput.openPanel();
  }
  onFileFocus() {
    this.fileInputTrigger._onChange('');
    this.fileInputTrigger.openPanel();
  }
  createNewContactDialog(contact) {
    const dialConfig = new MatDialogConfig();
    dialConfig.disableClose = true;
    dialConfig.autoFocus = true;
    dialConfig.data = contact;
    dialConfig.data.new = true;
    const dialogRef = this.dialog.open(ContactDialogComponent, dialConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.allContacts.push(res);
        this.contactsForEntities.push({
          name: res.name,
          _id: res._id
        });
        this.conPersonInput.nativeElement.value = '';
        this.contacts.setValue(null);
        this.conPersChips.setValue(this.contactsForEntities);
        this.filteredContacts = this.contacts.valueChanges.pipe(
          startWith(null),
          map((con: string | null) => con ? this._filteredContacts(con) : this._filteredContacts('')));
        this.contacts.clearValidators();
        this.contacts.updateValueAndValidity();
      }
    });
  }
  submitEntity() {
    const e = this.CGForm;
    if (e.valid) {
      const newEntity = e.value;
      delete newEntity._id;
      delete newEntity.updatedBy;
      newEntity.contacts = newEntity.conPersChips.map(c => c._id);
      if (newEntity.fileChips.length > 0) {
        newEntity.files = newEntity.fileChips.map(f => f._id);
      }
      delete newEntity.conPersChips;
      delete newEntity.fileChips;
      if (!newEntity.files) {
        newEntity.files = [];
      }
      /* this.entityService.createEntity(newEntity)
        .subscribe(res => {
          if (res) {
            console.log(res);
            this.matSnack.open('Entity created successfully');
            this.dialogRef.close(res);
          } else {
            const sb = this.matSnack.open('Entity not created successfully', 'retry');
            sb.onAction().subscribe(() => {
              this.submitEntity();
            });
          }
        }, err => {
          const sb = this.matSnack.open('Entity not created successfully', 'retry');
          sb.onAction().subscribe(() => {
            this.submitEntity();
          });
          console.log(err);
        }); */
    }
  }
  updateEntity() {
    const e = this.CGForm;
    if (e.valid) {
      const newEntity = e.value;
      delete newEntity.updatedBy;
      newEntity.contacts = newEntity.conPersChips.map(c => c._id);
      newEntity.files = newEntity.fileChips.map(f => f._id);
      delete newEntity.conPersChips;
      delete newEntity.fileChips;
      if (!newEntity.files) {
        newEntity.files = [];
      }
      /* this.entityService.updateEntity(newEntity)
        .subscribe(res => {
          if (res) {
            this.matSnack.open('Entity updated successfully');
            this.dialogRef.close(res);
          } else {
            const sb = this.matSnack.open('Entity not updated successfully', 'retry');
            sb.onAction().subscribe(() => {
              this.updateEntity();
            });
          }
        }, err => {
          const sb = this.matSnack.open('Entity not updated successfully', 'retry');
          sb.onAction().subscribe(() => {
            this.updateEntity();
          });
          console.log(err);
        }); */
    }
  }
  onNameChange() {
    if (this.existing) {
      if (this.name.value !== this.data.name) {
        this.name.setAsyncValidators(this.shouldBeUnique.bind(this));
        this.name.updateValueAndValidity();
      } else {
        this.name.clearAsyncValidators();
        this.name.updateValueAndValidity();
      }
    } else {
      if (this.name.value !== '') {
        this.name.setAsyncValidators(this.shouldBeUnique.bind(this));
      } else {
        this.name.clearAsyncValidators();
      }
    }
  }
  shouldBeUnique(control: AbstractControl): Promise<ValidationErrors> | null {
    const q = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === '') {
          resolve(null);
        } else {
          /* this.entityService.entityExists(control.value).subscribe((res) => {
            if (!res) {
              resolve(null);
            } else {
              resolve({'nameNotUnique': true});
            }
          }); */
        }
      }, 100);
    });
    return q;
  }
}
