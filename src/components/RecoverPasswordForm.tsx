import { createSignal } from 'solid-js';
import toast from 'solid-toast';

export default function RecoverPasswordForm() {
  const [email, setEmail] = createSignal('');
  const [loading, setLoading] = createSignal(false);

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!isValidEmail(email())) {
      toast.error('Por favor ingresa un correo válido');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Si el correo existe, recibirás un mensaje con instrucciones.');
      setEmail('');
    }, 1500);
  }

  return (
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 animate-fade-in">
      <h2 class="text-2xl font-bold mb-2 text-center">Recupera tu contraseña</h2>
      <p class="text-gray-600 text-center">Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.</p>
      <form class="flex flex-col gap-4" autocomplete="off" onSubmit={handleSubmit}>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></svg>
          </span>
          <input
            type="email"
            name="email"
            required
            placeholder="Correo electrónico"
            class="border border-gray-300 rounded px-4 py-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email()}
            onInput={e => setEmail((e.target as HTMLInputElement).value)}
            disabled={loading()}
          />
        </div>
        <button
          type="submit"
          class={`bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded py-2 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 ${loading() ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
          disabled={!isValidEmail(email()) || loading()}
        >
          {loading() ? (
            <svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
          ) : 'Enviar instrucciones'}
        </button>
      </form>
      <div class="text-center text-sm mt-2">
        ¿Recuerdas tu clave? <a href="/login" class="text-blue-500 hover:underline">Inicia sesión</a>
      </div>
    </div>
  );
} 