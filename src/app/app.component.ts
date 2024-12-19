import { Component } from '@angular/core';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { MainComponent } from "./components/main/main.component";

@Component({
  selector: 'app-root',
  imports: [SidebarComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'fit-track';
  sidebarSelected: string = 'All'; // Default value

  // Update the sidebarSelected value based on the emitted event from SidebarComponent
  onSidebarChange(selected: string): void {
    this.sidebarSelected = selected;
  }
}
