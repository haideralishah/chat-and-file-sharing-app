import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() {
    this.setNavBar('noAuth');
  }

  currentNavBar;
  setNavBar(val) {
    this.currentNavBar = val;
  }
}
