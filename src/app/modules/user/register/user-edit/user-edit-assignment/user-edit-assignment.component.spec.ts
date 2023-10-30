import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditAssignmentComponent } from './user-edit-assignment.component';

describe('UserEditAssignmentComponent', () => {
  let component: UserEditAssignmentComponent;
  let fixture: ComponentFixture<UserEditAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEditAssignmentComponent]
    });
    fixture = TestBed.createComponent(UserEditAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
