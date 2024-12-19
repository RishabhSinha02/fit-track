import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, SelectButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],  // Corrected the file name from 'styleUrl' to 'styleUrls'
  standalone: true,
})
export class HeaderComponent implements OnInit {
  greeting: string = '';

  formGroup: FormGroup;
  stateOptions = [
    { label: 'Real Data', value: 'real' },
    { label: 'Sample Data', value: 'sample' },
  ];

  constructor(private fb: FormBuilder, private userDataService: UserDataService) {
    this.formGroup = this.fb.group({
      toggle: ['real'], // Default selection is real data
    });
  }

  onToggleChange(event: any): void {
    const selectedValue = event.value;
    if (selectedValue === 'sample') {
      this.userDataService.switchToSampleData();
    } else {
      this.userDataService.switchToRealData();
    }
  }

  ngOnInit(): void {
    this.setGreeting();
  }

  setGreeting(): void {
    const hours = new Date().getHours();
    if (hours < 12) {
      this.greeting = 'Morning, 👋';
    } else if (hours < 18) {
      this.greeting = 'Afternoon, 👋';
    } else {
      this.greeting = 'Evening, 👋';
    }
  }
}
