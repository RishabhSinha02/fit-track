import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],  // Corrected the file name from 'styleUrl' to 'styleUrls'
  standalone: true,
})
export class HeaderComponent implements OnInit {
  greeting: string = '';

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
