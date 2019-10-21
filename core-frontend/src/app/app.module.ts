import { LoaderModule } from './Common/Loader/index';
import { NavComponent } from './nav/nav.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MilestonesComponent } from './milestones/milestones.component';
import { UsersComponent } from './users/users.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactGroupsComponent } from './contact-groups/contact-groups.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MilestoneListDialogComponent } from './milestones/milestone-list-dialog/milestone-list-dialog.component';
import { UserDialogComponent } from './users/user-dialog/user-dialog.component';
import { ContactDialogComponent } from './contacts/contact-dialog/contact-dialog.component';
import { ContactGroupDialogComponent } from './contact-groups/contact-group-dialog/contact-group-dialog.component';
import { TaskDialogComponent } from './tasks/task-dialog/task-dialog.component';
import { MilestoneDialogComponent } from './milestones/milestone-dialog/milestone-dialog.component';
import { SortablejsModule } from 'ngx-sortablejs';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MilestonesComponent,
    UsersComponent,
    ContactsComponent,
    ContactGroupsComponent,
    DashboardComponent,
    MilestoneListDialogComponent,
    UserDialogComponent,
    ContactDialogComponent,
    ContactGroupDialogComponent,
    TaskDialogComponent,
    MilestoneDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    LoaderModule,
    SortablejsModule.forRoot({animation: 150})
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MilestoneListDialogComponent,
    UserDialogComponent,
    ContactDialogComponent,
    ContactGroupDialogComponent,
    TaskDialogComponent,
    MilestoneDialogComponent
  ]
})
export class AppModule { }
