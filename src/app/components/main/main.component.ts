import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { TableComponent } from "../table/table.component";
import { FiltersComponent } from "../filters/filters.component";
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserData, UserDataService } from '../../services/user-data.service';
import { UserChartComponent } from "../user-chart/user-chart.component";

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, TableComponent, FiltersComponent, CommonModule, UserChartComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  standalone: true,
})
export class MainComponent {
  @Input() sidebarSelected: string = 'All';
  
  users: UserData[] = [];

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    // Subscribe to the users$ observable to get the user list
    this.userDataService.users$.subscribe((users) => {
      this.users = users; // Assign the users list to the component property
    });
}
}
