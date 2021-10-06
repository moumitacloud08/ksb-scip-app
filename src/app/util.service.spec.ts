import { TestBed } from '@angular/core/testing';

import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilService);
  });
  it('isLoggenIn should be a boolean', () => {
    service.isLoggenIn = true
    expect(service.isLoggenIn).toBe(true);
  });
  it('updatedRecordCountFunc should be a string', () => {
    service.updatedRecordCountFunc = "1"
    expect(service.updatedRecordCountFunc).toBe("1");
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
