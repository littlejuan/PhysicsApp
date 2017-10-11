import { Component } from '@angular/core';

@Component({
  selector: 'experience-bar',
  templateUrl: 'experience-bar.html'
})
export class ExperienceBarComponent {

  progress: number;

  constructor() {
    console.log('Hello ExperienceBarComponent Component');
    this.progress = 30;
  }

}
