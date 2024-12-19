import { TestBed } from '@angular/core/testing';
import { UserDataService, UserData } from './user-data.service';
import { BehaviorSubject } from 'rxjs';

// Mocking localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

describe('UserDataService', () => {
  let service: UserDataService;

  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addUser', () => {
    it('should add a new user', () => {
      const userName = 'John Doe';
      const workout = { type: 'Running', minutes: 30 };

      service.addUser(userName, workout);

      service.users$.subscribe((users) => {
        expect(users.length).toBe(1);
        expect(users[0].name).toBe(userName);
        expect(users[0].workouts.length).toBe(1);
        expect(users[0].workouts[0].type).toBe(workout.type);
        expect(users[0].workouts[0].minutes).toBe(workout.minutes);
      });
    });
  });

  describe('deleteUser', () => {
    it('should delete a user by id', () => {
      const userName = 'Jane Doe';
      const workout = { type: 'Cycling', minutes: 45 };
      service.addUser(userName, workout);

      const userId = service['userData'][0].id; // Retrieve the user ID

      service.deleteUser(userId);

      service.users$.subscribe((users) => {
        expect(users.length).toBe(0);
      });
    });
  });

  describe('addOrUpdateUser', () => {
    it('should add a new user if the user does not exist', () => {
      const userName = 'Alice Cooper';
      const workout = { type: 'Yoga', minutes: 60 };

      service.addOrUpdateUser(userName, workout);

      service.users$.subscribe((users) => {
        expect(users.length).toBe(1);
        expect(users[0].name).toBe(userName);
        expect(users[0].workouts.length).toBe(1);
        expect(users[0].workouts[0].type).toBe(workout.type);
      });
    });

    it('should update an existing user if the user already exists', () => {
      const userName = 'Rishabh Sinha';
      const workout = { type: 'Running', minutes: 25 };
      
      service.addOrUpdateUser(userName, workout);

      service.users$.subscribe((users) => {
        const user = users.find((u) => u.name === userName);
        expect(user).toBeTruthy();
        expect(user?.workouts.length).toBeGreaterThan(0);
      });

      const updatedWorkout = { type: 'Running', minutes: 40 };
      service.addOrUpdateUser(userName, updatedWorkout);

      service.users$.subscribe((users) => {
        const updatedUser = users.find((u) => u.name === userName);
        expect(updatedUser?.workouts.some(w => w.type === 'Running' && w.minutes === 65)).toBeTrue();
      });
    });
  });
});
