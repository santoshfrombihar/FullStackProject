import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilestepComponent } from './profilestep.component';

describe('ProfilestepComponent', () => {
  let component: ProfilestepComponent;
  let fixture: ComponentFixture<ProfilestepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilestepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilestepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
