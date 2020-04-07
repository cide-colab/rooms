import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.page.html',
  styleUrls: ['./root.page.scss']
})
export class RootPage {
  title = 'rooms-web';

  constructor(public translate: TranslateService) {
    translate.addLangs(['de', 'en']);
    translate.setDefaultLang('de');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/de|en/) ? browserLang : 'de');
  }
}
