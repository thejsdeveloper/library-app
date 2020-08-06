import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from './route-transition-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransitionAnimations],
})
export class AppComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.addCustomIcons();
  }

  addCustomIcons() {
    this.matIconRegistry.addSvgIcon(
      'book',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/images/study.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'enter',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/images/login.svg'
      )
    );
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState']
    );
  }
}
