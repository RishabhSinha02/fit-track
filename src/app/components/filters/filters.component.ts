import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class FiltersComponent {
  name = '';
  workoutType = '';
  workoutMinutes = 0;

  constructor(private userDataService: UserDataService) {}

  addWorkout() {
    if (this.name && this.workoutType && this.workoutMinutes > 0) {
      this.userDataService.addOrUpdateUser(this.name, {
        type: this.workoutType,
        minutes: this.workoutMinutes,
      });
      // Reset form fields
      this.name = '';
      this.workoutType = '';
      this.workoutMinutes = 0;
    }
  }
}
