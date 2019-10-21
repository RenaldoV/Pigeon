import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneListDialogComponent } from './milestone-list-dialog.component';

describe('MilestoneListDialogComponent', () => {
  let component: MilestoneListDialogComponent;
  let fixture: ComponentFixture<MilestoneListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilestoneListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestoneListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
