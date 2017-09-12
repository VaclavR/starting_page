import { BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites.service';
import { Subscription } from 'rxjs/Subscription';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})

export class TabsComponent implements OnInit, OnDestroy {

  menuItems: string[];
  subscription: Subscription;

  public isCollapsed = true;

  constructor(private favService: FavoritesService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.menuItems = this.favService.getMenuItems();
    this.subscription = this.favService.menuItemsUpdated
      .subscribe((menuItems: string[]) => {
        this.menuItems = menuItems;
      });
  }

  public collapsed(event: any): void {
    console.log(event);
  }

  public expanded(event: any): void {
    console.log(event);
  }

  onSettings() {
    this.modalService.show(SettingsComponent);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
