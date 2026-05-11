<script setup>
import { ref } from 'vue'
import { useDark } from '../composables/useDark'

const { isDark, toggleDark } = useDark()

const languages = ['Java', 'JavaScript', 'HTML/CSS']
const frameworks = ['Vue', 'Node.js', 'Unity', 'Sequelize', 'Microservices']
const tools = ['GitHub', 'Visual Studio', 'Docker']
const databases = ['MySQL', 'MongoDB']

const emit = defineEmits(['navigate'])

const navigation = [
  { name: 'Inicio', href: '#' },
  { name: 'Quién soy', href: '#' },
  { name: 'Proyectos', href: '#' },
  { name: 'Contacto', href: '#' },
]
</script>

<template>
  <div
    class="relative min-h-screen w-full overflow-hidden bg-queen-pink flex flex-col items-center justify-center p-4 md:p-8">

    <!-- Floating Background Spheres (Matching Home Style) -->
    <div
      class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-middle-purple rounded-full blur-[100px] opacity-60 animate-float">
    </div>
    <div
      class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-jacarta rounded-full blur-[120px] opacity-30 animate-float-delayed">
    </div>
    <div class="absolute top-[20%] right-[10%] w-32 h-32 bg-white rounded-full blur-[40px] opacity-40 animate-float">
    </div>

    <!-- Main Container (Matching Home Style) -->
    <main class="glass w-full max-w-6xl rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col min-h-[80vh]">

      <!-- Top Navigation Bar (Matching Home Style) -->
      <nav class="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10">
        <div class="flex items-center space-x-2"></div>

        <div class="hidden md:flex space-x-8">
          <a v-for="item in navigation" :key="item.name" :href="item.href" @click.prevent="$emit('navigate', item.name)"
            class="text-old-lavender hover:text-jacarta font-medium transition-colors cursor-pointer">
            {{ item.name }}
          </a>
        </div>

        <div class="flex items-center space-x-4">
          <button
            @click="toggleDark"
            class="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center hover:bg-white/50 transition-all">
            {{ isDark ? '☀️' : '🌙' }}
          </button>
        </div>
      </nav>

      <!-- Content Area -->
      <div class="flex-1 p-8 md:p-16 pt-32 md:pt-32 flex flex-col gap-10">

        <!-- Bio Section -->
        <div class="flex flex-col lg:flex-row gap-12 items-center lg:items-start">

          <!-- Text Content -->
          <div class="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div class="inline-block relative mb-6">
              <span class="relative z-10 text-4xl md:text-5xl font-black text-jacarta uppercase tracking-tighter">Quién
                soy</span>
              <div class="absolute bottom-1 left-0 w-full h-4 bg-queen-pink -z-10 rotate-1"></div>
            </div>

            <div class="max-w-2xl">
         
                <p class="text-old-lavender text-lg leading-relaxed font-medium">
                  Desarrolladora multiplataforma apasionada por el <span class="text-jacarta font-black italic">Frontend</span> y el buen diseño. Disfruto creando interfaces visuales increíbles, pero siempre con un motor fuerte detrás, por eso complemento la parte visual con un Backend sólido.
                  <br><br>
                  Recién graduada en el Ciclo Superior de <span class="text-middle-purple font-black">DAM</span>. Mi objetivo es seguir especializándome en interfaces interactivas, accesibles y con un diseño impecable.
                </p>
              
            </div>
          </div>
        </div>

        <!-- Skills Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <!-- Languages -->
          <div
            class="glass-card p-6 rounded-[32px] group">
            <div class="flex items-center gap-3 mb-4">
              <h3 class="font-black text-jacarta text-xs uppercase tracking-widest">Lenguajes</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="s in languages" :key="s"
                class="text-[10px] font-bold px-3 py-1.5 bg-jacarta/10 rounded-full border border-jacarta/20 text-jacarta shadow-sm">
                {{ s }}
              </span>
            </div>
          </div>

          <!-- Frameworks -->
          <div
            class="glass-card p-6 rounded-[32px] group">
            <div class="flex items-center gap-3 mb-4">
              <h3 class="font-black text-jacarta text-xs uppercase tracking-widest">Frameworks</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="s in frameworks" :key="s"
                class="text-[10px] font-bold px-3 py-1.5 bg-jacarta/10 rounded-full border border-jacarta/20 text-jacarta shadow-sm">
                {{ s }}
              </span>
            </div>
          </div>

          <!-- Tools -->
          <div
            class="glass-card p-6 rounded-[32px] group">
            <div class="flex items-center gap-3 mb-4">
              <h3 class="font-black text-jacarta text-xs uppercase tracking-widest">Herramientas</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="s in tools" :key="s"
                class="text-[10px] font-bold px-3 py-1.5 bg-jacarta/10 rounded-full border border-jacarta/20 text-jacarta shadow-sm">
                {{ s }}
              </span>
            </div>
          </div>

          <!-- Databases -->
          <div
            class="glass-card p-6 rounded-[32px] group">
            <div class="flex items-center gap-3 mb-4">
              <h3 class="font-black text-jacarta text-xs uppercase tracking-widest">Bases Datos</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="s in databases" :key="s"
                class="text-[10px] font-bold px-3 py-1.5 bg-jacarta/10 rounded-full border border-jacarta/20 text-jacarta shadow-sm">
                {{ s }}
              </span>
            </div>
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
</style>
