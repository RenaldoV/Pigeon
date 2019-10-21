import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, HostListener } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public location: Location,
    public router: Router
  ) {
    console.log(this.config.panels[0].activated);
  }
  config = {
    panels: [
      { name: 'Milestones', description: 'Add and configure milestone lists.',
        icon: 'fas fa-tasks', route: '/milestones',
        activated: '/milestones' === this.router.url ? true : false
      },
      { name: 'Users', description: 'Invite users to collaborate',
        icon: 'fas fa-users', route: '/users',
        activated: '/users' === this.router.url ? true : false
      },
      { name: 'Contacts', description: 'Manage contact list',
        icon: 'fas fa-id-card-alt', route: '/contacts',
        activated: '/contacts' === this.router.url ? true : false
      },
      { name: 'Contact Groups', description: 'Manage contact groups',
        icon: 'fas fa-building', route: '/contact-groups',
        activated: '/contact-groups' === this.router.url ? true : false
      }
    ]
  };
  title = 'core-frontend';
  collapsed = true;

  @HostListener('document:keydown.[')
  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  navigateTo(route) {
    console.log(route);
    this.router.navigate([route]);
  }
}
