import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogpromptComponent } from './dialogprompt.component';

describe('DialogpromptComponent', () => {
  let component: DialogpromptComponent;
  let fixture: ComponentFixture<DialogpromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogpromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogpromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
