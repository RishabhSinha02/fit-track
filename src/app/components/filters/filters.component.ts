import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {DialogModule} from 'primeng/dialog';

@Component({
  selector: 'app-filters',
  standalone: true,
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule],
})
export class FiltersComponent {
  name = '';
  workoutType = '';
  workoutMinutes = 0;

  visible = false;

  constructor(private userDataService: UserDataService) {}

  showDialog() {
    this.visible = true;
  }

  hideDialog() {
    this.visible = false;
  }

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
      this.hideDialog();
    }
  }
}
