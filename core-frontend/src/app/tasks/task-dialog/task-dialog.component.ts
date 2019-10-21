import { ContactDialogComponent } from './../../contacts/contact-dialog/contact-dialog.component';
import { MilestoneService } from './../../milestones/milestone.service';
import { UserService } from './../../users/user.service';
import { ContactService } from './../../contacts/contact.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, OnChanges, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { CdkDragDrop , moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {
  MatDialog,
  MatDialogConfig,
  MatSnackBar,
  MatAutocompleteSelectedEvent,
  MatChipInputEvent,
  MatAutocomplete, MatAutocompleteTrigger, ErrorStateMatcher, MatStepper, MatDialogRef
} from '@angular/material';
import {LoaderService} from '../../Common/Loader';
import { ContactGroupDialogComponent } from 'src/app/contact-groups/contact-group-dialog/contact-group-dialog.component';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
  file;
  existing = false;
  taskForm: FormGroup;
  descriptionForm: FormGroup;
  milestonesLists: any[] = [];
  filteredContacts: any[] = [];
  fileContactsList: any[] = [];
  searchTerm$ = new Subject<string>();
  // Chips autocomplete
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredSecretaries: Observable<any[]>;
  allSecretaries: any[] = [];
  secretaries: any[] = [];
  matcher = new ErrorStateMatcher();
  @ViewChild('secInput', {static: true}) secretaryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', {static: true}) secretaryAutoComp: MatAutocomplete;
  @ViewChild('secTrigger', {static: true}) secInput: MatAutocompleteTrigger;
  // Entity chips autocomplete
  entity = new FormControl('');
  entityChips = new FormControl('');
  filteredEntities: Observable<any[]>;
  allEntities: any[] = [];
  selectedEntity: any[] = [];
  @ViewChild('entityInput', {static: true}) entityInput: ElementRef<HTMLInputElement>;
  @ViewChild('autoEntities', {static: true}) autoEntities: MatAutocomplete;
  @ViewChild('enTrigger', {static: true}) enInputTrigger: MatAutocompleteTrigger;
  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private dialog: MatDialog,
    private matSnack: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    public loaderService: LoaderService,
    private userService: UserService,
    private milestoneService: MilestoneService,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
  ) {
    this.createTaskForm();
    this.createDescriptionForm();
    this.userService.getUserNames()
      .subscribe(res => {
        if (res) {
          this.secretaries = res.filter(s => s.name === this.userService.getName());
          this.allSecretaries = res;
          if (!this.route.snapshot.paramMap.get('id')) {
            this.secChips.setValue(this.secretaries);
          }
        }
      }, err => {
        console.log(err);
      });
    this.milestoneService.getAllMilestoneLists()
      .subscribe(res => {
        if (res) {
          this.milestonesLists = res;
          console.log(res);
        }
      }, err => {
        console.log(err);
      });
    this.contactService.searchContacts(this.searchTerm$)
      .subscribe(res => {
        this.filteredContacts = [];
        res.forEach(ct => {
          if (this.fileContactsList.map(c => c.email).indexOf(ct.email) === -1) {
            this.filteredContacts.push(ct);
          }
        });
      });
    this.filteredSecretaries = this.refUser.valueChanges.pipe(
      startWith(null),
      map((sec: string | null) => sec ? this._filterSecretaries(sec) : this._filterSecretaries('')));
    /* this.entityService.entityNames()
      .subscribe(e => {
        if (e) {
          this.allEntities = e;
        }
      }, err => {
        console.log(err);
      });
    this.filteredEntities = this.entity.valueChanges.pipe(
      startWith(null),
      map((en: string | null) => en ? this._filterEntities(en) : this._filterEntities(''))); */
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // patch the form
    /* if (id) {
      this.fileService.getFile(id)
        .subscribe(res => {
          if (res) {
            this.file = res;
            console.log(this.file);
            this.descriptionForm.patchValue(this.file);
            this.taskRef.setValue(this.file.taskRef);
            this.milestoneList.setValue(this.file.milestoneList._id._id);
            this.secretaries = this.file.refUser.map(s => ({name: s.name, _id: s._id}));
            this.secChips.setValue(this.secretaries);
            if (this.file.entity) {
              this.selectedEntity.push(this.file.entity);
              this.entityChips.setValue(this.selectedEntity);
            }
            if (this.file.bank) {
              this.bank.setValue(this.file.bank);
            }
            this.fileContactsList = this.file.contacts;
          }
        }, (err) => {
          console.log(err);
        });
    } */
  }
  showRoute() {
    if (this.route.snapshot.paramMap.get('id')) {
      return 'Edit File';
    } else {
      return 'Add File';
    }
  }
  // ======= File Form functions ===============

  // ====auto complete functions=======
  createTaskForm() {
    this.taskForm = this.fb.group({
      taskRef: ['', Validators.required],
      /*action: ['', Validators.required],*/
      refUser: [''],
      secChips: ['', Validators.required],
      milestoneList: ['', Validators.required],
      bank: ['']
    });
  }
  get taskRef() {
    return this.taskForm.get('taskRef');
  }
  get refUser() {
    return this.taskForm.get('refUser');
  }
  get secChips() {
    return this.taskForm.get('secChips');
  }
  get milestoneList() {
    return this.taskForm.get('milestoneList');
  }
  get bank() {
    return this.taskForm.get('bank');
  }
  milestoneListSelected(e) {
    const ms = this.milestonesLists.filter(m => m._id === e);
    if (ms[0].title === 'Bond') {
      this.bank.setValidators([Validators.required]);
      this.bank.updateValueAndValidity();
    } else {
      this.bank.clearValidators();
      this.bank.updateValueAndValidity();
    }
  }
  isBond() {
    const ms = this.milestonesLists.filter(m => m._id === this.milestoneList.value);
    if (ms[0]) {
      if (ms[0].title === 'Bond') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  // ======= File Form functions ===============
  // ======= Property Form functions ===============
  createDescriptionForm() {
    this.descriptionForm = this.fb.group({
      taskDescription: ['', Validators.required]
    });
  }
  get taskDescription() {
    return this.descriptionForm.get('taskDescription');
  }
  /*get erfNumber () {
    return this.descriptionForm.get('erfNumber');
  }
  get portionNum () {
    return this.descriptionForm.get('portionNum');
  }
  get propType () {
    return this.descriptionForm.get('propType');
  }*/
  // ======= Property Form functions ===============
  // ======= Contacts Form functions ===============
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
  createNewContactDialog() {
    const dialConfig = new MatDialogConfig();
    dialConfig.disableClose = true;
    dialConfig.autoFocus = true;
    dialConfig.data = {new: true};
    const dialogRef = this.dialog.open(ContactDialogComponent, dialConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.fileContactsList.push(res);
      }
    });
  }
  // TODO: add guard to prevent user navigating away if form is Dirty.
  // Chips autocomplete functions
  remove(sec): void {
    const index = this.secretaries.indexOf(sec);

    if (index >= 0) {
      this.secretaries.splice(index, 1);
      this.secChips.setValue(this.secretaries);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    const selectedSec = {_id: event.option.value, name: event.option.viewValue};
    this.secretaries.push(selectedSec);
    this.secretaryInput.nativeElement.value = '';
    this.refUser.setValue(null);
    this.secChips.setValue(this.secretaries);
  }
  private _filterSecretaries(value: string): string[] {
    const secNames = this.secretaries.map(s => s.name);
    const filterValue = value.toLowerCase();
    return this.allSecretaries.filter(sec => sec.name.toLowerCase().indexOf(filterValue) === 0 && secNames.indexOf(sec.name) === -1);
  }
  onFocus() {
    this.secInput._onChange('');
    this.secInput.openPanel();
  }
  submitFile() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.updateFile();
    } else {
      if (this.descriptionForm.valid && this.taskForm.valid) {
        this.descriptionForm.value.refUser = this.secretaries.map(s => s._id);
        delete this.descriptionForm.value.secChips;
        const file = {...this.taskForm.value, ...this.descriptionForm.value, ...{'contacts': this.fileContactsList.map(ct => ct._id)}};
        if (this.selectedEntity.length > 0) {
          file.entity = this.selectedEntity[0]._id;
        }
        /* this.fileService.createFile(file)
          .subscribe(res => {
            if (res) {
              const sb = this.matSnack.open('File saved successfully', 'Ok');
              sb.onAction().subscribe(() => {
                this.router.navigate(['/admin-home']);
              });
              sb.afterDismissed().subscribe(() => {
                this.router.navigate(['/admin-home']);
              });
            } else {
              const sb = this.matSnack.open('Save unsuccessful', 'retry');
              sb.onAction().subscribe(() => {
                this.submitFile();
              });
            }
          }); */
      } else {
        this.matSnack.open('Please check that all data is valid');
      }
    }
  }
  updateFile() {
    if (this.descriptionForm.valid && this.taskForm.valid) {
      this.descriptionForm.value.refUser = this.secretaries.map(s => s._id);
      delete this.descriptionForm.value.secChips;
      const file = {
        _id: this.route.snapshot.paramMap.get('id'),
        ...this.taskForm.value, ...this.descriptionForm.value,
        ...{'contacts': this.fileContactsList.map(ct => ct._id)}
      };
      if (this.selectedEntity.length > 0) {
        file.entity = this.selectedEntity[0]._id;
      } else {
        file.entity = null;
      }
      /* this.fileService.updateFile(file)
        .subscribe(res => {
          if (res) {
            const sb = this.matSnack.open('File updated successfully', 'Ok');
            sb.onAction().subscribe(() => {
              this.router.navigate(['/admin-home']);
            });
            sb.afterDismissed().subscribe(() => {
              this.router.navigate(['/admin-home']);
            });
          } else {
            const sb = this.matSnack.open('Update unsuccessful', 'retry');
            sb.onAction().subscribe(() => {
              this.submitFile();
            });
          }
        }); */
    } else {
      this.matSnack.open('Please check that all data is valid');
    }
  }
  // ENTITY AUTOCOMPLETE FUNCTIONS
  onEnFocus() {
    this.enInputTrigger._onChange('');
    this.enInputTrigger.openPanel();
  }
  private _filterEntities(value: string): string[] {
    const filterValue = value.toLowerCase();
    let results = this.allEntities.filter(en => en.name.toLowerCase().indexOf(filterValue) === 0);
    if (results.length < 1 && filterValue !== '') { // entity doesn't exist create new one.
      results = [{name: 'Would you like to add *' + value + '* as a new entity?', _id: 'new'}];
    }
    return results;
  }
  selectEntity(event: MatAutocompleteSelectedEvent): void {
    if (this.selectedEntity.length > 0) {
      this.matSnack.open('You can only associate one entity with a file');
    } else {
      const selectedEn = {_id: event.option.value, name: event.option.viewValue};
      if (selectedEn._id === 'new') { // contact doesn't exist, create new
        const enArr = selectedEn.name.split('*');
        const name = enArr[1];
        const ent = {
          name: name
        };
        this.createNewEntityDialog(ent);
      } else {
        this.selectedEntity.push(selectedEn);
        this.entityInput.nativeElement.value = '';
        this.entity.setValue(null);
        this.entityChips.setValue(this.selectedEntity);
      }
    }
  }
  createNewEntityDialog(en?) {
    const dialConfig = new MatDialogConfig();
    dialConfig.disableClose = true;
    dialConfig.autoFocus = true;
    dialConfig.data = en;
    const dialogRef = this.dialog.open(ContactGroupDialogComponent, dialConfig);
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.allEntities.push(res);
        this.selectedEntity.push({
          name: res.name,
          _id: res._id
        });
        this.entityInput.nativeElement.value = '';
        this.entity.setValue(null);
        this.entityChips.setValue(this.selectedEntity);
      }
    });
  }
  removeEntity(en): void {
    const index = this.selectedEntity.indexOf(en);
    if (this.file) {
      /* this.entityService.removeFileFromEntity(en._id, this.file._id)
        .subscribe(res => {
          if (res) {
            if (index >= 0) {
              this.selectedEntity.splice(index, 1);
              this.entityChips.setValue(this.selectedEntity);
              this.matSnack.open('Entity removed successfully');
            }
          }
        }); */
    } else {
      if (index >= 0) {
        this.selectedEntity.splice(index, 1);
        this.entityChips.setValue(this.selectedEntity);
      }
    }
  }
  goForward(stepper: MatStepper) {
    stepper.next();
  }
  goBack(stepper: MatStepper) {
    stepper.previous();
  }
  close() {
    if (this.taskForm.valid && this.descriptionForm.valid && this.fileContactsList.length > 0) {
      this.dialogRef.close();
    } else {
      if (confirm('Are you sure you want to close? All progress will be lost?')) {
        this.dialogRef.close();
      }
    }
  }
  matCurrentStep(stepper: MatStepper) {
    switch (stepper.selectedIndex) {
      case 0:
        return 'Next';
      case 1:
        return 'Next';
      case 2:
        return 'Next';
      case 3:
        return 'Save';
    }
  }
  stepNext(stepper: MatStepper) {
    switch (stepper.selectedIndex) {
      case 0:
        this.goForward(stepper);
        break;
      case 1:
        this.goForward(stepper);
        this.searchTerm$.next('');
        break;
      case 2:
        this.goForward(stepper);
        break;
      case 3:
        this.goForward(stepper);
        break;
    }
  }
  hasPrevious(stepper: MatStepper): boolean {
    switch (stepper.selectedIndex) {
      case 0:
        return false;
      case 1:
        return true;
      case 2:
        return true;
      case 3:
        return true;
    }
  }
  isContactStep(stepper: MatStepper) {
    if (stepper.selectedIndex === 2) {
      return true;
    } else {
      return false;
    }
  }
  // TODO: Update file, patch entity properly.
}
