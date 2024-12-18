import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { TableComponent } from "../table/table.component";
import { FiltersComponent } from "../filters/filters.component";

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, SidebarComponent, TableComponent, FiltersComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  standalone: true,
})
export class MainComponent {

}
