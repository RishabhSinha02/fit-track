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
  
}
