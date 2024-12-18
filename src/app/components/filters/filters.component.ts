import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  imports: [FormsModule],
})
export class FiltersComponent {
  name = '';
  workoutType = '';
  minutes = 0;

  constructor(private userDataService: UserDataService) {}

  addUser(): void {
    if (this.name && this.workoutType && this.minutes > 0) {
      this.userDataService.addOrUpdateUser(
        this.name,
        this.workoutType,
        this.minutes
      );
      this.clearForm();
    }
  }

  clearForm(): void {
    this.name = '';
    this.workoutType = '';
    this.minutes = 0;
  }
}
