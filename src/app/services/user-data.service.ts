import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private usersKey = 'fitTrackUsers';

  constructor() {
    // Initialize localStorage with default data if empty
    if (!localStorage.getItem(this.usersKey)) {
      localStorage.setItem(
        this.usersKey,
        JSON.stringify([
          {
            id: 1,
            name: 'John Doe',
            workouts: [
              { type: 'Running', minutes: 30 },
              { type: 'Cycling', minutes: 45 },
            ],
          },
        ])
      );
    }
  }

  getUsers(): any[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }

  addOrUpdateUser(name: string, workoutType: string, minutes: number): void {
    const users = this.getUsers();
    const existingUser = users.find((user) => user.name === name);

    if (existingUser) {
      // Update existing user's workout
      const workout = existingUser.workouts.find(
        (w: { type: string; minutes: number }) => w.type === workoutType
      );
      if (workout) {
        workout.minutes += minutes;
      } else {
        existingUser.workouts.push({ type: workoutType, minutes });
      }
    } else {
      // Add new user
      const newUser = {
        id: users.length + 1,
        name,
        workouts: [{ type: workoutType, minutes }],
      };
      users.push(newUser);
    }

    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }
}
