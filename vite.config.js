import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Substitua 'NOME-DO-SEU-REPOSITORIO' pelo nome exato do repositório no GitHub
  // Se o repositório for o seu perfil principal (ex: usuario.github.io), use base: '/'
  base: '/meusitev2/', 
})