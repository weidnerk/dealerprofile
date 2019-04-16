import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlrprofileComponent } from './dlrprofile.component';

describe('DlrprofileComponent', () => {
  let component: DlrprofileComponent;
  let fixture: ComponentFixture<DlrprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DlrprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DlrprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
