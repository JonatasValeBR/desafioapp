import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.page.html',
  styleUrls: ['./bar.page.scss'],
})
export class BarPage implements OnInit {
  @ViewChild('tabs', { static: false }) tabs: IonTabs;
  constructor() { }
  selectedTab: String;
  ngOnInit() {
  }

  setCurrentTab() {
    this.selectedTab = this.tabs.getSelected();
  }
}
