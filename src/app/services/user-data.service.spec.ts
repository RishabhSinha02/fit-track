import { TestBed } from '@angular/core/testing';
import { UserDataService, UserData } from './user-data.service';
import { BehaviorSubject } from 'rxjs';

describe('UserDataService', () => {
  let service: UserDataService;

  beforeEach(() => {
    // Mocking localStorage for testing purposes
    const localStorageMock = {
      getItem: jasmine.createSpy('getItem').and.returnValue('[]'),
      setItem: jasmine.createSpy('setItem')
    };
    spyOn(localStorage, 'getItem').and.callFake(localStorageMock.getItem);
    spyOn(localStorage, 'setItem').and.callFake(localStorageMock.setItem);

    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize user data from localStorage', () => {
    const initialUsers = service['getUsersFromLocalStorage']();
    expect(initialUsers).toEqual([]);
  });

  it('should add a new user', () => {
    const newUserName = 'John Doe';
    const workout = { type: 'Running', minutes: 30 };

    service.addUser(newUserName, workout);

    service.users$.subscribe(users => {
      expect(users.length).toBe(1);
      expect(users[0].name).toBe(newUserName);
      expect(users[0].workouts[0].type).toBe(workout.type);
      expect(users[0].workouts[0].minutes).toBe(workout.minutes);
    });
  });

  it('should delete a user', () => {
    // Add a user to delete later
    service.addUser('Jane Doe', { type: 'Cycling', minutes: 45 });

    service.deleteUser(1);

    service.users$.subscribe(users => {
      expect(users.length).toBe(0);
    });
  });

  it('should add or update a user and workout', () => {
    const userName = 'Mark Smith';
    const workout = { type: 'Swimming', minutes: 20 };

    // Add a new user with a workout
    service.addOrUpdateUser(userName, workout);
    service.users$.subscribe(users => {
      expect(users.length).toBe(1);
      expect(users[0].name).toBe(userName);
      expect(users[0].workouts.length).toBe(1);
      expect(users[0].workouts[0].minutes).toBe(workout.minutes);
    });

    // Update the existing workout
    service.addOrUpdateUser(userName, { type: 'Swimming', minutes: 30 });
    service.users$.subscribe(users => {
      expect(users[0].workouts[0].minutes).toBe(50); // 20 + 30
    });

    // Add a new workout for the user
    service.addOrUpdateUser(userName, { type: 'Running', minutes: 40 });
    service.users$.subscribe(users => {
      expect(users[0].workouts.length).toBe(2);
      expect(users[0].workouts[1].type).toBe('Running');
      expect(users[0].workouts[1].minutes).toBe(40);
    });
  });

  it('should save updated user data to localStorage after adding a user', () => {
    const spy = spyOn(localStorage, 'setItem');

    service.addUser('Alice', { type: 'Yoga', minutes: 60 });

    expect(spy).toHaveBeenCalledWith('users', JSON.stringify([{
      id: 1,
      name: 'Alice',
      workouts: [{ type: 'Yoga', minutes: 60 }]
    }]));
  });

  it('should save updated user data to localStorage after deleting a user', () => {
    // Add a user
    service.addUser('Bob', { type: 'Running', minutes: 40 });

    // Delete the user
    const spy = spyOn(localStorage, 'setItem');

    service.deleteUser(1);

    expect(spy).toHaveBeenCalledWith('users', JSON.stringify([]));
  });

});
