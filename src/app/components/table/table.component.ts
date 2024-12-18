import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],  // Corrected to styleUrls
  standalone: true,
})
export class TableComponent {
  userData = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    },
    {
      id: 4,
      name: 'Emily Davis',
      workouts: [
        { type: 'Running', minutes: 40 },
        { type: 'Weightlifting', minutes: 30 }
      ]
    },
    {
      id: 5,
      name: 'David Miller',
      workouts: [
        { type: 'Cycling', minutes: 60 },
        { type: 'Swimming', minutes: 45 }
      ]
    },
    {
      id: 6,
      name: 'Sophia Wilson',
      workouts: [
        { type: 'Yoga', minutes: 40 },
        { type: 'Running', minutes: 25 }
      ]
    },
    {
      id: 7,
      name: 'Lucas Garcia',
      workouts: [
        { type: 'Cycling', minutes: 50 },
        { type: 'Weightlifting', minutes: 35 }
      ]
    },
    {
      id: 8,
      name: 'Olivia Martinez',
      workouts: [
        { type: 'Swimming', minutes: 45 },
        { type: 'Yoga', minutes: 30 }
      ]
    },
    {
      id: 9,
      name: 'Ethan Brown',
      workouts: [
        { type: 'Running', minutes: 55 },
        { type: 'Cycling', minutes: 20 }
      ]
    },
    {
      id: 10,
      name: 'Ava Taylor',
      workouts: [
        { type: 'Yoga', minutes: 60 },
        { type: 'Swimming', minutes: 30 }
      ]
    }
  ];

  getTotalWorkoutMinutes(workouts: any[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }
}
