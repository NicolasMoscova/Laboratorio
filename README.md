# Agenda Virtual - Peluquería

Usuario admin: Sergio
Contraseña admin: peluqueria

Este proyecto es una agenda virtual pensada para profesionales independientes.  
Permite reservar turnos con fecha y horario, gestionar usuarios y contar con un **administrador** que puede ver todos los turnos.

# Funcionalidades:

- Registro e inicio de sesión de usuarios.
- Reservas de turnos con fecha, hora y tipo de servicio.
- Cancelación de turnos propios.
- Panel exclusivo para el administrador:
- Exportar turnos a un archivo `.json`.


# Usuarios disponibles por defecto

- **Administrador**  
Usuario: `Sergio`  
Contraseña: `peluqueria`  

- **Usuario demo**    
Usuario: `demo`  
Contraseña: `demo`

# Estructura del proyecto

- `index.html` → página inicial con acceso a login, registro o reserva rápida.  
- `login.html` → formulario de inicio de sesión.  
- `register.html` → formulario de registro de nuevos usuarios.  
- `agenda.html` → aplicación principal de reservas.  
- `style.css` → estilos del sitio.  
- `script.js` → lógica en JavaScript (manejo de usuarios, reservas, panel admin).  
- `data.json` → archivo con datos iniciales de ejemplo.  
- `README.md` → este documento explicativo.

# Como levantar el proyecto

No requiere instalación de librerías ni bases de datos externas.  
Funciona directamente en un navegador web moderno.

# Opción 1: Ejecutar localmente
1. Descargar el repositorio o clonar con `git clone`.
2. Abrir el archivo `index.html` en un navegador.

# Opción 2: Usar GitHub Pages
1. Subir el repositorio a GitHub.
2. En el repositorio, ir a **Settings -> Pages**.
3. Seleccionar la rama `main` y la carpeta `/ (root)`.
4. Guardar y acceder a la URL pública que GitHub genera.

# Tecnologías utilizadas

- HTML5  
- CSS3  
- JavaScript (con `localStorage`)  
- JSON (para datos iniciales)