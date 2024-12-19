import { Component, Input, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-user-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './user-chart.component.html',
  styleUrls: ['./user-chart.component.scss'],
})
export class UserChartComponent implements OnInit {
  @Input() user: any; // Receive user data from the parent component

  basicData: any; // Chart data
  basicOptions: any; // Chart options

  ngOnInit() {
    if (this.user) {
      // Prepare the chart data based on the passed user
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

      // Chart options (optional)
      
    }
  }
}
