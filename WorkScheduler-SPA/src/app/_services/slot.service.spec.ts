/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SlotService } from './slot.service';

describe('Service: Slot', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlotService]
    });
  });

  it('should ...', inject([SlotService], (service: SlotService) => {
    expect(service).toBeTruthy();
  }));
});
