import { ContactGroupsComponent } from './contact-groups/contact-groups.component';
import { UsersComponent } from './users/users.component';
import { MilestonesComponent } from './milestones/milestones.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactsComponent } from './contacts/contacts.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'milestones', component: MilestonesComponent },
  { path: 'users', component: UsersComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'contact-groups', component: ContactGroupsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
