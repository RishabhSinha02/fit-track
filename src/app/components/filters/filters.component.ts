import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { Output, EventEmitter } from '@angular/core';




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

  @Output() nameFilterChange = new EventEmitter<string>();
  @Output() workoutFilterChange = new EventEmitter<string>();

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

  onNameFilterChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.nameFilterChange.emit(value); // Emit the input value to the parent
  }

  onWorkoutFilterChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.workoutFilterChange.emit(value); // Emit the input value to the parent
  }
}
