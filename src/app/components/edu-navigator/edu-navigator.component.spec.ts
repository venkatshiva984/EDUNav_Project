import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EduNavigatorComponent } from './edu-navigator.component';

describe('EduNavigatorComponent', () => {
  let component: EduNavigatorComponent;
  let fixture: ComponentFixture<EduNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EduNavigatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EduNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
