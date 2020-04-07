import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RootPage } from './root.page';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        RootPage
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(RootPage);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'rooms-web'`, () => {
    const fixture = TestBed.createComponent(RootPage);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('rooms-web');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(RootPage);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('rooms-web app is running!');
  });
});
