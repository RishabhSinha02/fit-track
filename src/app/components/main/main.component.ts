import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { TableComponent } from "../table/table.component";
import { FiltersComponent } from "../filters/filters.component";

@Component({
  selector: 'app-main',
  imports: [HeaderComponent, TableComponent, FiltersComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  standalone: true,
})
export class MainComponent {

}
