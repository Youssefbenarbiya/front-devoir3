import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { equipeGuard } from './equipe.guard';

describe('equipeGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => equipeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
