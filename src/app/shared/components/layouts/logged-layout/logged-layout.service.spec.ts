/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoggedLayoutService } from './logged-layout.service';

describe('Service: LoggedLayout', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedLayoutService]
    });
  });

  it('should ...', inject([LoggedLayoutService], (service: LoggedLayoutService) => {
    expect(service).toBeTruthy();
  }));
});
