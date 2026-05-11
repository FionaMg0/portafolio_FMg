<script setup>
import { ref, computed } from 'vue'
import { useDark } from '../composables/useDark'

const { isDark, toggleDark } = useDark()

const emit = defineEmits(['navigate'])

const navigation = [
  { name: 'Inicio', href: '#' },
  { name: 'Quién soy', href: '#' },
  { name: 'Proyectos', href: '#' },
  { name: 'Contacto', href: '#' },
]

const projects = [
  {
    id: 1,
    title: 'MUVV',
    subtitle: "Aplicación de ejercicio en tiempo real",
    description: "App social y multijugador que desafía a los usuarios a moverse y competir. Utiliza IA para la detección de posturas en tiempo real, permitiendo un entrenamiento interactivo y social.",
    features: [
      'Detección de Movimiento por IA (TensorFlow.js)',
      'Sesiones Multijugador en tiempo real',
      'Componente Social y Feed de actividades',
      'Sistema de Puntuación y Ranking Global'
    ],
    tech: ['Vue.js 3', 'Node.js', 'TensorFlow.js', 'WebSockets', 'Tailwind CSS', 'Docker'],
    image: 'muvv.png',
    color: '#d183a9',
    repo: 'https://github.com/FionaMg0/muvv-realtime-exercice-web.git'
  },
  {
    id: 2,
    title: 'ENGINY',
    subtitle: 'Consorcio de Educación de Barcelona',
    description: 'Aplicación web educativa desarrollada para digitalizar el Programa Enginy. Un recurso orientador e inclusivo que busca garantizar la escolarización y ofrecer herramientas para el descubrimiento vocacional.',
    features: [
      'Descubrimiento Vocacional y orientación laboral',
      'Fomento del Éxito Educativo y prevención del absentismo',
      'Creación de Itinerarios inclusivos y adaptados',
      'Digitalización completa del Programa Enginy'
    ],
    tech: ['Vue 3', 'Vuetify 3', 'Express', 'MongoDB Atlas', 'Node.js'],
    image: 'enginy.png',
    color: '#3a345b',
    repo: 'https://github.com/FionaMg0/Projecte-ENGINY.git'
  },
  {
    id: 3,
    title: 'BOMBERMAN',
    subtitle: 'Juego Multijugador',
    description: 'Proyecto de juego multijugador clásico desarrollado con una arquitectura de microservicios. Incluye sincronización en tiempo real mediante WebSockets y un cliente desarrollado en Unity 2D.',
    features: [
      'Arquitectura de Microservicios escalable',
      'Sincronización en Tiempo Real (WebSockets)',
      'Cliente desarrollado en Unity 2D & C#',
      'Infraestructura con Docker y Nginx'
    ],
    tech: ['Unity', 'Node.js', 'MongoDB', 'Docker', 'WebSockets', 'Express'],
    image: 'bomberman.png',
    color: '#71557a',
    repo: 'https://github.com/FionaMg0/Bomberman.git'
  }
]

const activeProjectIndex = ref(0)
const currentProject = computed(() => projects[activeProjectIndex.value])

const nextProject = () => {
  activeProjectIndex.value = (activeProjectIndex.value + 1) % projects.length
}

const prevProject = () => {
  activeProjectIndex.value = (activeProjectIndex.value - 1 + projects.length) % projects.length
}

const selectProject = (index) => {
  activeProjectIndex.value = index
}
</script>

<template>
  <div class="relative min-h-screen w-full overflow-hidden bg-queen-pink flex flex-col items-center justify-center p-4 md:p-8">
    
    <!-- Floating Background Spheres -->
    <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-middle-purple rounded-full blur-[100px] opacity-60 animate-float"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-jacarta rounded-full blur-[120px] opacity-30 animate-float-delayed"></div>
    <div class="absolute top-[20%] right-[10%] w-32 h-32 bg-white rounded-full blur-[40px] opacity-40 animate-float"></div>

    <!-- Main Container -->
    <main class="glass w-full max-w-6xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col min-h-[85vh]">
      
      <!-- Top Navigation Bar -->
      <nav class="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-center z-50">
        <div class="flex items-center space-x-2"></div>
        
        <div class="flex space-x-4 md:space-x-8 overflow-x-auto no-scrollbar px-2 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 md:bg-transparent md:backdrop-blur-none md:border-none md:overflow-visible">
          <a v-for="item in navigation" :key="item.name" :href="item.href" 
             @click.prevent="$emit('navigate', item.name)"
             :class="[
               'text-[10px] md:text-base text-old-lavender hover:text-jacarta font-black uppercase tracking-widest md:font-medium md:capitalize md:tracking-normal transition-colors cursor-pointer whitespace-nowrap',
               item.name === 'Proyectos' ? 'text-jacarta font-bold border-b-2 border-middle-purple' : ''
             ]">
            {{ item.name }}
          </a>
        </div>

        <div class="flex items-center space-x-4">
          <button @click="toggleDark" class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-all text-xs md:text-base">
            {{ isDark ? '☀️' : '🌙' }}
          </button>
        </div>
      </nav>

      <!-- Projects Content Slider -->
      <div class="flex-1 flex flex-col lg:flex-row pt-24 pb-12 px-6 md:px-12 gap-8 h-full overflow-y-auto lg:overflow-visible">
        
        <!-- Left: Project Info -->
        <div class="flex-1 flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left">
          <transition name="slide-fade" mode="out-in">
            <div :key="currentProject.id" class="space-y-4 md:space-y-6">
              <div>
                <span class="text-middle-purple font-bold tracking-widest uppercase text-[10px] md:text-xs">{{ currentProject.subtitle }}</span>
                <h2 class="text-3xl sm:text-5xl md:text-6xl font-black text-jacarta mt-1 md:mt-2">{{ currentProject.title }}</h2>
              </div>
              
              <p class="text-old-lavender text-sm md:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0">
                {{ currentProject.description }}
              </p>

              <div class="space-y-3 md:space-y-4">
                <h4 class="text-jacarta font-bold text-[11px] md:text-sm uppercase tracking-tighter">Características Principales</h4>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                  <li v-for="feature in currentProject.features" :key="feature" class="flex items-center space-x-2 text-[12px] md:text-sm text-old-lavender/80">
                    <span class="w-1.5 h-1.5 rounded-full bg-middle-purple shrink-0"></span>
                    <span>{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <!-- Tech Stack -->
              <div class="flex flex-wrap justify-center lg:justify-start gap-1.5 md:gap-2 pt-2">
                <span v-for="t in currentProject.tech" :key="t" 
                      class="px-2.5 py-1 bg-jacarta/5 rounded-full text-[9px] md:text-xs font-bold text-jacarta border border-jacarta/10">
                  {{ t }}
                </span>
              </div>

              <!-- CTA Buttons -->
              <div class="pt-4 md:pt-6 flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
                <a :href="currentProject.repo" target="_blank" class="px-5 py-2 md:px-8 md:py-3 bg-jacarta text-white rounded-xl md:rounded-full font-bold text-[11px] md:text-sm hover:bg-middle-purple transition-all shadow-lg hover:shadow-middle-purple/30 flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                  Ver Código
                </a>
                <button @click="$emit('navigate', 'Contacto')" class="px-5 py-2 md:px-8 md:py-3 bg-white/50 text-jacarta rounded-xl md:rounded-full font-bold text-[11px] md:text-sm hover:bg-white transition-all border border-jacarta/10">
                  Me interesa
                </button>
              </div>
            </div>
          </transition>
        </div>

        <!-- Right: Project Image -->
        <div class="flex-1 relative order-1 lg:order-2 flex items-center justify-center min-h-[200px] md:min-h-0">
          <transition name="zoom-fade" mode="out-in">
            <div :key="currentProject.id" class="relative w-full max-w-lg transition-all duration-700">
               <img :src="currentProject.image" :alt="currentProject.title" class="w-full h-auto max-h-[40vh] md:max-h-[50vh] object-contain drop-shadow-2xl animate-float-slow" />
            </div>
          </transition>
        </div>

      </div>

      <!-- Navigation Footer -->
      <div class="p-6 md:p-8 border-t border-jacarta/5 flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6 bg-white/5">
        
        <!-- Project Indicators -->
        <div class="flex items-center space-x-2 md:space-x-3 order-2 sm:order-1">
          <button v-for="(p, index) in projects" :key="p.id" 
                  @click="activeProjectIndex = index"
                  class="group relative flex flex-col items-start transition-all duration-300"
                  :class="activeProjectIndex === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'">
            <div class="h-1.5 md:h-2.5 rounded-full bg-jacarta transition-all duration-500"
                 :class="activeProjectIndex === index ? 'w-12 md:w-20' : 'w-4 md:w-8'"></div>
          </button>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex items-center space-x-3 order-1 sm:order-2">
          <button @click="prevProject" class="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-jacarta/10 flex items-center justify-center hover:bg-jacarta hover:text-white transition-all group">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button @click="nextProject" class="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-jacarta/10 flex items-center justify-center hover:bg-jacarta hover:text-white transition-all group">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-x-1 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
          </button>
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

/* Animations */
.slide-fade-enter-active {
  transition: all 0.5s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from {
  transform: translateX(30px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-30px);
  opacity: 0;
}

.zoom-fade-enter-active {
  transition: all 0.6s ease-out;
}
.zoom-fade-leave-active {
  transition: all 0.4s ease-in;
}
.zoom-fade-enter-from {
  transform: scale(0.9) rotate(-2deg);
  opacity: 0;
}
.zoom-fade-leave-to {
  transform: scale(1.1) rotate(2deg);
  opacity: 0;
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
