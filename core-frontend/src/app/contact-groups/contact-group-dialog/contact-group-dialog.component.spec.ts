import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactGroupDialogComponent } from './contact-group-dialog.component';

describe('ContactGroupDialogComponent', () => {
  let component: ContactGroupDialogComponent;
  let fixture: ComponentFixture<ContactGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactGroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
