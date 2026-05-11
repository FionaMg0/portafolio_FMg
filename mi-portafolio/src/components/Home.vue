<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useDark } from '../composables/useDark'

const { isDark, toggleDark } = useDark()

const emit = defineEmits(['navigate'])

const navigation = [
  { name: 'Inicio', href: '#' },
  { name: 'Quién soy', href: '#' },
  { name: 'Proyectos', href: '#' },
  { name: 'Contacto', href: '#' },
]

// Terminal Logic
const terminalInput = ref('')
const terminalOutput = ref([
  { type: 'system', text: 'VaporOS [Version 1.0.24]' },
  { type: 'system', text: '' },
  { type: 'system', text: 'Escribe "help" para ver los comandos disponibles.' },
])
const inputRef = ref(null)

const handleCommand = () => {
  const cmd = terminalInput.value.trim().toLowerCase()
  if (!cmd) return

  terminalOutput.value.push({ type: 'user', text: `user@user:~$ ${terminalInput.value}` })

  switch (cmd) {
    case 'help':
      terminalOutput.value.push({ type: 'system', text: 'Comandos disponibles: help, about, projects, contact, clear, date' })
      break
    case 'about':
      terminalOutput.value.push({ type: 'system', text: 'Fiona: Desarrolladora multiplataforma apasionada por el Frontend y el buen diseño.' })
      break
    case 'projects':
      terminalOutput.value.push({ type: 'system', text: 'Abriendo sección de proyectos...' })
      setTimeout(() => {
        emit('navigate', 'Proyectos')
      }, 500)
      break
    case 'contact':
      terminalOutput.value.push({ type: 'system', text: 'Redirigiendo a contacto...' })
      setTimeout(() => {
        emit('navigate', 'Contacto')
      }, 500)
      break
    case 'clear':
      terminalOutput.value = []
      break
    case 'date':
      terminalOutput.value.push({ type: 'system', text: new Date().toLocaleString() })
      break
    default:
      terminalOutput.value.push({ type: 'error', text: `Comando no reconocido: ${cmd}` })
  }

  terminalInput.value = ''
  
  // Auto-scroll to bottom
  nextTick(() => {
    const container = document.getElementById('terminal-content')
    if (container) container.scrollTop = container.scrollHeight
  })
}

const focusTerminal = () => {
  if (inputRef.value) inputRef.value.focus()
}

onMounted(() => {
  focusTerminal()
})
</script>

<template>
  <div class="relative min-h-screen w-full overflow-hidden bg-queen-pink flex flex-col items-center justify-center p-4 md:p-8 text-jacarta">
    
    <!-- Floating Background Spheres -->
    <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-middle-purple rounded-full blur-[100px] opacity-60 animate-float"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-jacarta rounded-full blur-[120px] opacity-30 animate-float-delayed"></div>
    <div class="absolute top-[20%] right-[10%] w-32 h-32 bg-white rounded-full blur-[40px] opacity-40 animate-float"></div>

    <!-- Main Container -->
    <main class="glass w-full max-w-6xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row min-h-[80vh]">
      
      <!-- Top Navigation Bar -->
      <nav class="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-50">
        <div class="flex items-center space-x-2"></div>
        
        <div class="flex space-x-4 md:space-x-8 overflow-x-auto no-scrollbar px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 md:bg-transparent md:backdrop-blur-none md:border-none md:overflow-visible">
          <a v-for="item in navigation" :key="item.name" :href="item.href" 
             @click.prevent="$emit('navigate', item.name)"
             class="text-[10px] md:text-base text-old-lavender hover:text-jacarta font-black uppercase tracking-widest md:font-medium md:capitalize md:tracking-normal transition-colors cursor-pointer whitespace-nowrap">
            {{ item.name }}
          </a>
        </div>

        <div class="flex items-center space-x-4">
          <button @click="toggleDark" class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-all text-xs md:text-base">
            {{ isDark ? '☀️' : '🌙' }}
          </button>
        </div>
      </nav>

      <!-- Content Grid -->
      <div class="flex-1 p-6 md:p-16 pt-24 md:pt-32 flex flex-col justify-center relative z-20">
        <div class="max-w-3xl">
          <h1 class="text-4xl sm:text-6xl md:text-8xl font-serif italic text-jacarta mb-6 md:mb-8 leading-[0.9]">
            Hola, soy <span class="text-middle-purple not-italic font-black">Fiona</span>.<br/>
          </h1>
          <p class="text-old-lavender text-sm md:text-xl mb-8 md:mb-10 max-w-lg leading-relaxed">
            Especializada en el desarrollo de aplicaciones multiplataforma con un enfoque en el diseño estético y funcional.
          </p>

          <!-- Action Boxes -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="service in services" :key="service.title" 
                 class="glass-card p-4 md:p-6 rounded-[24px] md:rounded-3xl flex flex-col">
              <span class="text-2xl md:text-3xl mb-2 md:mb-3">{{ service.icon }}</span>
              <h3 class="text-jacarta font-bold text-base md:text-lg mb-1">{{ service.title }}</h3>
              <p class="text-old-lavender text-[12px] md:text-sm opacity-80 leading-snug">{{ service.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Hero Visual Side: Retro Terminal -->
      <div class="hidden lg:flex flex-1 relative items-center justify-center p-8 overflow-hidden bg-gradient-to-br from-white/10 to-transparent">
        <div class="retro-terminal w-full max-w-lg aspect-[4/3] rounded-lg overflow-hidden flex flex-col shadow-2xl animate-pop-in" @click="focusTerminal">
          <!-- Terminal Title Bar -->
          <div class="retro-title-bar flex items-center justify-between p-2 px-4 bg-jacarta">
            <div class="flex space-x-2">
              <div class="w-3 h-3 rounded-full bg-middle-purple"></div>
              <div class="w-3 h-3 rounded-full bg-queen-pink opacity-50"></div>
              <div class="w-3 h-3 rounded-full bg-white opacity-20"></div>
            </div>
            <span class="text-[10px] font-mono font-bold text-queen-pink uppercase tracking-widest">Fiona_Terminal.exe</span>
            <div class="w-12"></div>
          </div>
          
          <!-- Terminal Content Area -->
          <div id="terminal-content" class="flex-1 bg-jacarta/90 p-4 font-mono text-xs overflow-y-auto custom-scrollbar relative">
            <div class="scanlines absolute inset-0 pointer-events-none"></div>
            
            <div v-for="(line, idx) in terminalOutput" :key="idx" :class="[
              'mb-1 break-all',
              line.type === 'user' ? 'text-white' : 
              line.type === 'error' ? 'text-red-400' : 'text-queen-pink/90'
            ]">
              {{ line.text }}
            </div>
            
            <!-- Input Line -->
            <div class="flex items-center text-white">
              <span class="mr-2 text-middle-purple">fiona@portfolio:~$</span>
              <input 
                ref="inputRef"
                v-model="terminalInput" 
                @keyup.enter="handleCommand"
                class="bg-transparent border-none outline-none flex-1 text-white caret-middle-purple"
                autofocus
              />
            </div>
          </div>
        </div>

        <!-- Decorative Elements -->
        <div class="absolute top-[10%] right-[10%] w-32 h-32 bg-middle-purple/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-[10%] left-[10%] w-24 h-24 bg-queen-pink/20 rounded-full blur-2xl animate-float"></div>
      </div>
    </main>

  
  </div>
</template>

<style scoped>
.retro-terminal {
  border: 2px solid var(--color-middle-purple);
  box-shadow: 0 0 20px rgba(209, 131, 169, 0.2), 0 0 40px rgba(58, 52, 91, 0.4);
}

.retro-title-bar {
  border-bottom: 1px solid rgba(209, 131, 169, 0.3);
}

.scanlines {
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(209, 131, 169, 0.05) 50%
  );
  background-size: 100% 4px;
  z-index: 10;
}

#terminal-content {
  text-shadow: 0 0 5px rgba(243, 200, 221, 0.5);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(58, 52, 91, 0.5);
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: var(--color-middle-purple);
  border-radius: 3px;
}

.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
}

.font-serif {
  font-family: 'Playfair Display', serif;
}

@keyframes pop-in {
  0% {
    transform: scale(0.9) translateY(20px);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.animate-pop-in {
  animation: pop-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

input {
  font-family: 'Courier New', Courier, monospace;
}
</style>
