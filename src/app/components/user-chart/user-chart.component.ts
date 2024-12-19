import { Component, Input, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-user-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.css'],
})
export class UserChartComponent implements OnInit {
  @Input() user: any; 

  basicData: any; // Chart data
  basicOptions: any; // Chart options

  ngOnInit() {
    if (this.user) {
      // Chart data
      this.basicData = {
        labels: this.user.workouts.map((workout: any) => workout.type), // Workout types
        datasets: [
          {
            label: 'Workout Minutes',
            data: this.user.workouts.map((workout: any) => workout.minutes), // Workout minutes
            backgroundColor: ['#42A5F5', '#66BB6A', '#FF9800'], // Bar colors
          },
        ],
      };
    }
  }
}
