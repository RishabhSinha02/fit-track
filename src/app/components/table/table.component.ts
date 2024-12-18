import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [CommonModule],
})
export class TableComponent implements OnInit {
  users: any[] = [];

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.userDataService.getUsers();
  }

  deleteUser(userId: number): void {
    const updatedUsers = this.users.filter((user) => user.id !== userId);
    localStorage.setItem('fitTrackUsers', JSON.stringify(updatedUsers));
    this.loadUsers();
  }

  calculateTotalMinutes(workouts: { type: string; minutes: number }[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }  
  
}
