# IdeaDetector 3000 🚀

IdeaDetector 3000 es una aplicación web que utiliza inteligencia artificial para analizar ideas de startups y determinar si tienen el potencial de convertirse en un negocio exitoso o si podrían ser una estafa piramidal.

## 🎯 Características

- **Análisis de Ideas**: Evalúa ideas de startups usando IA
- **Planes de Suscripción**:
  - Plan Free: 1 análisis por día
  - Plan Pro: Análisis ilimitados y características premium
- **Interfaz Moderna**: Diseño limpio y responsivo
- **Autenticación Segura**: Sistema de registro y login
- **Persistencia de Datos**: Almacenamiento seguro de información de usuario

## 🛠️ Tecnologías Utilizadas

- **Frontend**:
  - Next.js 14 (App Router)
  - React
  - TypeScript
  - Tailwind CSS
  - Shadcn/ui (Componentes UI)
  - Zustand (Gestión de Estado)

- **Backend**:
  - Supabase (Autenticación y Base de Datos)
  - Server Actions (Next.js)

## 🚀 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Guidotss/millonario-o-piramidal.git
cd idea-detector-3000
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
```

3. Configura las variables de entorno:
   - Renombra el archivo `.env.template` a `.env`
   - Completa las variables de entorno con tus credenciales de Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
NEXT_PUBLIC_OPENAI_API_KEY=tu_clave_de_openai
NEXT_PUBLIC_OPENAI_API_URL=https://api.openai.com/v1/chat/completions
```

4. Inicia el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📝 Uso

1. **Registro**:
   - Crea una cuenta con tu email y contraseña
   - La contraseña debe tener al menos 6 caracteres

2. **Inicio de Sesión**:
   - Ingresa tus credenciales para acceder

3. **Análisis de Ideas**:
   - Plan Free: Realiza 1 análisis por día
   - Plan Pro: Realiza análisis ilimitados
   - Describe tu idea en el campo de texto
   - Haz clic en "Analizar idea"

4. **Actualización a Pro**:
   - Accede a la sección Pro desde el dashboard
   - Sigue el proceso de pago para actualizar tu plan

## 🔒 Seguridad

- Autenticación manejada por Supabase
- Validación de contraseñas
- Protección de rutas
- Manejo seguro de sesiones

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

