import { TestBed } from '@angular/core/testing';

import { XMLDownloaderService } from './xmldownloader.service';

describe('XMLDownloaderService', () => {
  let service: XMLDownloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XMLDownloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
