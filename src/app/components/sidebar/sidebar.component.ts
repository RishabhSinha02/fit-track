import { Component, OnInit } from '@angular/core';
import { UserDataService, UserData } from '../../services/user-data.service';
import { CommonModule } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  imports: [CommonModule], // Import common module if you are using Angular directives like *ngFor
})
export class SidebarComponent implements OnInit {
  users: UserData[] = [];

  sidebarSelected = 'All';

  @Output() sidebarChangeEvent: EventEmitter<string> = new EventEmitter<string>();

  sidebarChange(selected: string): void {
    this.sidebarSelected = selected;
    this.sidebarChangeEvent.emit(this.sidebarSelected);
  };

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    // Subscribe to the users$ observable to get the user list
    this.userDataService.users$.subscribe((users) => {
      this.users = users; // Assign the users list to the component property
    });
  }
}
