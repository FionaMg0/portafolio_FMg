<script setup>
import { ref } from 'vue'
import { useDark } from '../composables/useDark'

const { isDark, toggleDark } = useDark()

const emit = defineEmits(['navigate'])

const navigation = [
  { name: 'Inicio', href: '#' },
  { name: 'Quién soy', href: '#' },
  { name: 'Proyectos', href: '#' },
  { name: 'Contacto', href: '#' },
]

const email = 'mondelofiona@gmail.com'
const linkedin = 'https://linkedin.com/in/fiona-mondelo'
const github = 'https://github.com/FionaMg0'

const copied = ref(false)

const copyEmail = () => {
  navigator.clipboard.writeText(email)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="relative min-h-screen w-full overflow-hidden bg-queen-pink flex flex-col items-center justify-center p-4 md:p-8">
    
    <!-- Floating Background Spheres -->
    <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-middle-purple rounded-full blur-[100px] opacity-60 animate-float"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-jacarta rounded-full blur-[120px] opacity-30 animate-float-delayed"></div>
    <div class="absolute top-[20%] right-[10%] w-32 h-32 bg-white rounded-full blur-[40px] opacity-40 animate-float"></div>

    <!-- Main Container -->
    <main class="glass w-full max-w-6xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col min-h-[80vh]">
      
      <!-- Top Navigation Bar -->
      <nav class="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <div class="flex items-center space-x-2"></div>
        
        <div class="hidden md:flex space-x-8">
          <a v-for="item in navigation" :key="item.name" :href="item.href" 
             @click.prevent="$emit('navigate', item.name)"
             :class="[
               'text-old-lavender hover:text-jacarta font-medium transition-colors cursor-pointer',
               item.name === 'Contacto' ? 'text-jacarta font-bold border-b-2 border-middle-purple' : ''
             ]">
            {{ item.name }}
          </a>
        </div>

        <div class="flex items-center space-x-4">
          <button @click="toggleDark" class="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-all">
            {{ isDark ? '☀️' : '🌙' }}
          </button>
        </div>
      </nav>

      <!-- Contact Content -->
      <div class="flex-1 flex flex-col lg:flex-row items-center justify-center p-8 md:p-20 pt-32 gap-16">
        
        <!-- Left Side: Large Typography -->
        <div class="flex-1 text-left lg:pr-12">
          <h2 class="text-6xl md:text-8xl font-serif italic text-jacarta leading-[0.9] mb-8">
            Say hi & lets's work together!
          </h2>
      
        </div>

        <!-- Right Side: Contact Details -->
        <div class="flex-1 w-full max-w-sm space-y-10">
          
          <!-- Email Section -->
          <div class="space-y-4">
            <a :href="'mailto:' + email" class="text-lg md:text-xl font-medium text-jacarta border-b border-jacarta/20 hover:border-middle-purple transition-all pb-1 inline-block">
              {{ email }}
            </a>
          </div>

          <!-- Social Links Grid -->
          <div class="flex flex-wrap gap-x-10 gap-y-4">
            <a :href="linkedin" target="_blank" class="flex items-center space-x-2 text-old-lavender hover:text-jacarta transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              <span class="text-[10px] font-black uppercase tracking-[0.2em]">LinkedIn</span>
            </a>
            
            <a :href="github" target="_blank" class="flex items-center space-x-2 text-old-lavender hover:text-jacarta transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              <span class="text-[10px] font-black uppercase tracking-[0.2em]">GitHub</span>
            </a>
          </div>

          
        </div>

      </div>

    </main>

  </div>
</template>

<style scoped>
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
}

.font-serif {
  font-family: 'Playfair Display', serif;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(15px, 25px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float 8s ease-in-out infinite;
  animation-delay: 2s;
}
</style>
