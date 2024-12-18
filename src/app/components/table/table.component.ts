import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [CommonModule],
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
  
}
