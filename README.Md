# 🛒 Ecommerce API

API RESTful para gestionar un sistema de comercio electrónico. Permite la autenticación de usuarios, gestión de productos y manejo de pedidos.

## Tecnologías

- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT (autenticación)
- bcryptjs (encriptación de contraseñas)

## ⚙️ Variables de entorno

Crea un archivo `.env` a partir de `.env.example`:

## 🛠️ Instalación

1. Clona el repositorio

git clone https://github.com/tu_usuario/Ecommerce.git
cd Ecommerce

2. Instala las dependecias

npm install

## 🔧 Configurar la base de datos

npx prisma generate                 # Genera el cliente Prisma
npx prisma migrate dev --name init  # Ejecuta la migración inicial

## 🌱 Ejecutar Seed

Este paso crea los roles, permisos y un usuario administrador inicial:

npx prisma db seed

## 👤 Usuario Administrador por Defecto

Luego de ejecutar el seed, se crea automáticamente un usuario con rol de administrador que puedes usar para ingresar al sistema.

**Credenciales por defecto:**

📧 Email: admin@ecommerce.com
🔑 Password: Admin123*

## 🚀 Correr el servidor

1. En desarrollo

npm run dev

1. En producción

npm run build
npm start

## ✅ Endpoint de prueba

Puedes comprobar si la API está funcionando accediendo a:

GET /ping

Respuesta: { "message": "pong" }