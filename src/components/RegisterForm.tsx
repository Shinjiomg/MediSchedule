import { createSignal, Show, createEffect } from 'solid-js';

const [step, setStep] = createSignal(1);
const [showToast, setShowToast] = createSignal(false);
const [showLoading, setShowLoading] = createSignal(false);

const [form, setForm] = createSignal({
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  confirmar: '',
  telefono: '',
  nacimiento: '',
  genero: '',
  direccion: '',
  ciudad: '',
  departamento: '',
  postal: '',
  seguro: '',
  numSeguro: '',
  terminos: false,
});

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement | HTMLSelectElement;
  setForm({ ...form(), [target.name]: target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value });
}

function nextStep(e: Event) {
  e.preventDefault();
  setStep(step() + 1);
}

function prevStep(e: Event) {
  e.preventDefault();
  setStep(step() - 1);
}

function handleSubmit(e: Event) {
  e.preventDefault();
  setShowLoading(true);
  setTimeout(() => {
    setShowLoading(false);
    window.sessionStorage.setItem('registroExitoso', '1');
    window.location.href = '/login';
  }, 1500);
}

function validStep1() {
  const f = form();
  console.log('validStep1', f);
  return !!(
    f.nombre.trim() &&
    f.apellido.trim() &&
    f.email.trim() &&
    f.password &&
    f.confirmar &&
    f.password === f.confirmar
  );
}
function validStep2() {
  const f = form();
  return !!(
    f.telefono.trim() &&
    f.nacimiento &&
    f.genero &&
    f.direccion.trim() &&
    f.ciudad.trim() &&
    f.departamento.trim() &&
    f.postal.trim()
  );
}
function validStep3() {
  const f = form();
  return !!(
    f.seguro &&
    f.numSeguro.trim() &&
    f.terminos
  );
}

export default function RegisterForm() {
  createEffect(() => {
    console.log('form actualizado', form());
  });
  return (
    <div class="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 animate-fade-in relative">
      <Show when={showToast()}>
        <div class="absolute top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-2 rounded shadow-lg z-20 animate-fade-in">
          ¡Registro exitoso! Ahora puedes iniciar sesión.
        </div>
      </Show>
      {/* Progreso de pasos */}
      <div class="flex items-center justify-between mb-4">
        <div class="flex flex-col items-center flex-1">
          <div class={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step() === 1 ? 'border-blue-500 text-blue-500' : step() > 1 ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 text-gray-400'}`}>{step() > 1 ? <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7" /></svg> : 1}</div>
          <span class={`text-xs mt-1 ${step() === 1 ? 'text-blue-500' : step() > 1 ? 'text-blue-500' : 'text-gray-400'}`}>Cuenta</span>
        </div>
        <div class={`flex-1 h-0.5 mx-2 ${step() > 1 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
        <div class="flex flex-col items-center flex-1">
          <div class={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step() === 2 ? 'border-blue-500 text-blue-500' : step() > 2 ? 'bg-blue-500 text-white border-blue-500' : 'border-gray-300 text-gray-400'}`}>{step() > 2 ? <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7" /></svg> : 2}</div>
          <span class={`text-xs mt-1 ${step() === 2 ? 'text-blue-500' : step() > 2 ? 'text-blue-500' : 'text-gray-400'}`}>Personal</span>
        </div>
        <div class={`flex-1 h-0.5 mx-2 ${step() > 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
        <div class="flex flex-col items-center flex-1">
          <div class={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${step() === 3 ? 'border-blue-500 text-blue-500' : 'border-gray-300 text-gray-400'}`}>3</div>
          <span class={`text-xs mt-1 ${step() === 3 ? 'text-blue-500' : 'text-gray-400'}`}>Seguro</span>
        </div>
      </div>
      <Show when={step() === 1}>
        <h2 class="text-2xl font-bold mb-2">Crea tu cuenta</h2>
        <form class="flex flex-col gap-4" autocomplete="off" onSubmit={nextStep}>
          <div class="flex gap-4">
            <div class="flex-1 relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
              </span>
              <input type="text" name="nombre" required placeholder="Nombre(s)" class="border border-gray-300 rounded px-4 py-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" value={form().nombre} onInput={handleInput} />
            </div>
            <div class="flex-1 relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
              </span>
              <input type="text" name="apellido" required placeholder="Apellido(s)" class="border border-gray-300 rounded px-4 py-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" value={form().apellido} onInput={handleInput} />
            </div>
          </div>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><polyline points="3 7 12 13 21 7" /></svg>
            </span>
            <input type="email" name="email" required placeholder="Correo electrónico" class="border border-gray-300 rounded px-4 py-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" value={form().email} onInput={handleInput} />
          </div>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </span>
            <input type="password" name="password" required placeholder="Contraseña" class="border border-gray-300 rounded px-4 py-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" value={form().password} onInput={handleInput} />
          </div>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            </span>
            <input type="password" name="confirmar" required placeholder="Confirmar contraseña" class="border border-gray-300 rounded px-4 py-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" value={form().confirmar} onInput={handleInput} />
          </div>
          <button
            type="submit"
            class={`bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded py-2 transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50 ${validStep1() ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            disabled={!validStep1()}
          >
            Siguiente
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /><path d="M13 18l6-6-6-6" /></svg>
          </button>
        </form>
      </Show>
      <Show when={step() === 2}>
        <h2 class="text-2xl font-bold mb-2">Información personal</h2>
        <form class="flex flex-col gap-4" autocomplete="off" onSubmit={nextStep}>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10a7 7 0 0 1 14 0v2a7 7 0 0 1-14 0v-2z" /><path d="M8 15h8" /></svg>
            </span>
            <input type="tel" name="telefono" required placeholder="Teléfono" class="border border-gray-300 rounded px-4 py-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" value={form().telefono} onInput={handleInput} />
          </div>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M16 3v4M8 3v4M4 11h16" /></svg>
            </span>
            <input type="date" name="nacimiento" required placeholder="Fecha de nacimiento" class="border border-gray-300 rounded px-4 py-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" value={form().nacimiento} onInput={handleInput} />
          </div>
          <div class="relative">
            <select name="genero" required class="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" value={form().genero} onInput={handleInput}>
              <option value="">Selecciona tu género</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div class="relative">
            <input type="text" name="direccion" required placeholder="Dirección" class="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" value={form().direccion} onInput={handleInput} />
          </div>
          <div class="flex gap-4">
            <div class="flex-1">
              <input type="text" name="ciudad" required placeholder="Ciudad" class="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" value={form().ciudad} onInput={handleInput} />
            </div>
            <div class="flex-1">
              <input type="text" name="departamento" required placeholder="Departamento" class="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" value={form().departamento} onInput={handleInput} />
            </div>
          </div>
          <div class="relative">
            <input type="text" name="postal" required placeholder="Código postal" class="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" value={form().postal} onInput={handleInput} />
          </div>
          <div class="flex justify-between mt-2">
            <button type="button" class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded py-2 px-6 flex items-center gap-2 cursor-pointer" onClick={prevStep}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5" /><path d="M11 18l-6-6 6-6" /></svg>
              Atrás
            </button>
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded py-2 px-6 flex items-center gap-2 cursor-pointer disabled:opacity-50" disabled={!validStep2()}>
              Siguiente
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /><path d="M13 18l6-6-6-6" /></svg>
            </button>
          </div>
        </form>
      </Show>
      <Show when={step() === 3}>
        <h2 class="text-2xl font-bold mb-2">Información de seguro</h2>
        <form class="flex flex-col gap-4 transition-all duration-500 animate-fade-in" autocomplete="off" onSubmit={handleSubmit}>
          <div class="relative">
            <select name="seguro" required class="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" value={form().seguro} onInput={handleInput}>
              <option value="">Selecciona tu EPS o aseguradora</option>
              <option value="Sura">Sura</option>
              <option value="Coomeva">Coomeva</option>
              <option value="Sanitas">Sanitas</option>
              <option value="Nueva EPS">Nueva EPS</option>
              <option value="Salud Total">Salud Total</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="16" rx="2" /><path d="M16 3v4M8 3v4M4 11h16" /></svg>
            </span>
            <input type="text" name="numSeguro" required placeholder="Número de afiliado" class="border border-gray-300 rounded px-4 py-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400" value={form().numSeguro} onInput={handleInput} />
          </div>
          <div class="bg-blue-50 border border-blue-200 text-blue-800 rounded p-3 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
            Verificaremos tu información de seguro con la EPS. Por favor asegúrate de que los datos sean correctos.
          </div>
          <label class="flex items-center gap-2 mt-2">
            <input type="checkbox" name="terminos" checked={form().terminos} onInput={handleInput} class="accent-blue-500" />
            Acepto los <a href="#" class="text-blue-500 hover:underline">Términos y Condiciones</a> y la <a href="#" class="text-blue-500 hover:underline">Política de Privacidad</a>
          </label>
          <div class="flex justify-between mt-2">
            <button type="button" class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded py-2 px-6 flex items-center gap-2 cursor-pointer" onClick={prevStep}>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5" /><path d="M11 18l-6-6 6-6" /></svg>
              Atrás
            </button>
            <button type="submit" class={`bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded py-2 px-6 flex items-center gap-2 transition-colors ${showLoading() ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'} disabled:opacity-50`} disabled={!validStep3() || showLoading()}>
              {showLoading() ? (
                <svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg>
              ) : 'Completar registro'}
            </button>
          </div>
        </form>
      </Show>
      <div class="text-center text-sm mt-2">
        ¿Ya tienes cuenta? <a href="/login" class="text-blue-500 hover:underline">Inicia sesión</a>
      </div>
    </div>
  );
} 