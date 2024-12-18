import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-table',
  imports: [TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  standalone: true,
})
export class TableComponent {

}
