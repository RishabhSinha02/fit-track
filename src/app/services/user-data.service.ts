import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserData {
  id: number;
  name: string;
  workouts: { type: string; minutes: number }[];
}

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userData: UserData[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 },
      ],
    },
  ];

  private userSubject = new BehaviorSubject<UserData[]>(this.userData);
  public users$ = this.userSubject.asObservable();


  deleteUser(userId: number): void {
    const updatedUsers = this.userSubject.value.filter(user => user.id !== userId);
    this.userSubject.next(updatedUsers); // Emit updated users list
  }

  addOrUpdateUser(userName: string, workout: { type: string; minutes: number }) {
    const existingUser = this.userData.find((user) => user.name === userName);

    if (existingUser) {
      // Check if the workout already exists for the user
      const existingWorkout = existingUser.workouts.find(
        (w) => w.type === workout.type
      );
      if (existingWorkout) {
        // Update workout minutes
        existingWorkout.minutes += workout.minutes;
      } else {
        // Add new workout
        existingUser.workouts.push(workout);
      }
    } else {
      // Add new user
      const newUser: UserData = {
        id: this.userData.length + 1,
        name: userName,
        workouts: [workout],
      };
      this.userData.push(newUser);
    }

    // Emit updated data to subscribers
    this.userSubject.next(this.userData);
  }
  
}
