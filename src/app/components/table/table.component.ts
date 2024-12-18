import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [CommonModule, TableModule],
})
export class TableComponent {
  users$;
  first = 0; // Used to track current page

  constructor(private userDataService: UserDataService) {
    this.users$ = this.userDataService.users$;
  }

  getTotalWorkoutMinutes(workouts: any[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  deleteUser(userId: number): void {
    this.userDataService.deleteUser(userId); // Calls the service method to update the users list
  }

  getWorkoutDetails(workouts: any[]): string {
    return workouts.map(workout => `${workout.type} (${workout.minutes} min)`).join(', ');
  }

  // Called when adding a new user
  addUser(userName: string, workout: { type: string; minutes: number }) {
    this.userDataService.addUser(userName, workout);
    // Ensure the table reloads and pagination updates correctly
    this.first = 0; // Reset to first page when a new user is added
  }

  onPage(event: any) {
  this.first = event.first; // Update the first page index on page change
}
}
