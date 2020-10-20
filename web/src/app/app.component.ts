import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  selector: 'app-component'
})
export class AppComponent {
  title = 'rooms-web';

  constructor(public translate: TranslateService) {
    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('de');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/de|en/) ? browserLang : 'de');
  }
}
