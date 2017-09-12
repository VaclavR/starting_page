import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  menuItems: string[];

  constructor(private favService: FavoritesService) { }

  ngOnInit() {
    this.menuItems = this.favService.getMenuItems();
  }

}
