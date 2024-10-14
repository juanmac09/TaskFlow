import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

export const authenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService)
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return router.navigate(['/dashboard']);
  }else{
    return true;
  }
};
