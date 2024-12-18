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
  private userData: UserData[] = [];

  private userSubject = new BehaviorSubject<UserData[]>(this.getUsersFromLocalStorage());
  public users$ = this.userSubject.asObservable();

  constructor() {
    // Initialize the userData from localStorage
    const storedUsers = this.getUsersFromLocalStorage();
    if (storedUsers.length) {
      this.userData = storedUsers;
    }
  }

  private getUsersFromLocalStorage(): UserData[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }

  private saveUsersToLocalStorage() {
    localStorage.setItem('users', JSON.stringify(this.userData));
  }

  deleteUser(userId: number): void {
    const updatedUsers = this.userSubject.value.filter(user => user.id !== userId);
    this.userData = updatedUsers; // Update the in-memory user data
    this.userSubject.next(updatedUsers); // Emit updated users list
    this.saveUsersToLocalStorage(); // Save the updated data to localStorage
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
    this.saveUsersToLocalStorage(); // Save the updated data to localStorage
  }
}
