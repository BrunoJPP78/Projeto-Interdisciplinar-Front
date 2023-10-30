import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedFilterButtonComponent } from './advanced-filter-button.component';
import { TranslateModule } from '@ngx-translate/core';

describe('AdvancedFilterButtonComponent', () => {
  let component: AdvancedFilterButtonComponent;
  let fixture: ComponentFixture<AdvancedFilterButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvancedFilterButtonComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdvancedFilterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
