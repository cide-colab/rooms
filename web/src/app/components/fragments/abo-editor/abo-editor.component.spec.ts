import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboEditorComponent } from './abo-editor.component';

describe('AboEditorComponent', () => {
  let component: AboEditorComponent;
  let fixture: ComponentFixture<AboEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
