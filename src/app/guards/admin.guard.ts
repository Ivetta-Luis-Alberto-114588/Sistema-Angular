import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

export const adminGuard: CanActivateFn = (route, state) => {
  
  const usuarioService = inject(UsuarioService)
  const router = inject(Router)
  
  console.log("admin guard")
if(usuarioService.role === 'ADMIN_ROLE'){
  return true
} else {
  router.navigate(['/dashboard'])
  return false;
}

};
