import { Component } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { FormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  imports: [FormsModule, Dialog, CommonModule, ButtonModule],
})
export class FiltersComponent {
  name = '';
  workoutType = '';
  minutes = 0;
  visible: boolean = false; // Controls visibility of the dialog

  

  constructor(private userDataService: UserDataService) {}

  showDialog(): void {
    this.visible = true; // This will open the dialog
  }

  addUser(): void {
    if (this.name && this.workoutType && this.minutes > 0) {
      this.userDataService.addOrUpdateUser(
        this.name,
        this.workoutType,
        this.minutes
      );
      this.clearForm();
      this.visible = false;
    }
  }

  clearForm(): void {
    this.name = '';
    this.workoutType = '';
    this.minutes = 0;
  }
}
