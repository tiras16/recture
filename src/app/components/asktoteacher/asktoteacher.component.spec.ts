import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsktoteacherComponent } from './asktoteacher.component';

describe('AsktoteacherComponent', () => {
  let component: AsktoteacherComponent;
  let fixture: ComponentFixture<AsktoteacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsktoteacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsktoteacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
