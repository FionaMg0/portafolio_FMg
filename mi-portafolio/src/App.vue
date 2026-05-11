<script setup>
import { ref } from 'vue'
import Home from './components/Home.vue'
import AboutMe from './components/AboutMe.vue'
import Projects from './components/Projects.vue'
import Contact from './components/Contact.vue'

const currentView = ref('Inicio')

const handleNavigate = (view) => {
  currentView.value = view
}
</script>

<template>
  <Transition name="fade" mode="out-in">
    <Home v-if="currentView === 'Inicio'" @navigate="handleNavigate" />
    <AboutMe v-else-if="currentView === 'Quién soy'" @navigate="handleNavigate" />
    <Projects v-else-if="currentView === 'Proyectos'" @navigate="handleNavigate" />
    <Contact v-else-if="currentView === 'Contacto'" @navigate="handleNavigate" />
  </Transition>
</template>

<style>
/* Reset and global styles are in style.css */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>