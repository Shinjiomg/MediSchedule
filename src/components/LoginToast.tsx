import { onMount } from 'solid-js';
import toast from 'solid-toast';

export default function LoginToast() {
  onMount(() => {
    if (window.sessionStorage.getItem('registroExitoso')) {
      toast.success('¡Registro exitoso! Ahora puedes iniciar sesión');
      window.sessionStorage.removeItem('registroExitoso');
    }
  });
  return null;
} 