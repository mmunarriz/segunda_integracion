# Implementación de login:

Aspectos a incluir:

- Crear un modelo User el cual contará con los campos:

  first_name:String,

  last_name:String,

  email:String (único)

  age:Number,

  password:String(Hash)

  cart:Id con referencia a Carts

  role:String(default:'user')

- Desarrollar las estrategias de Passport para que funcionen con este modelo de usuarios

- Modificar el sistema de login del usuario para poder trabajar con session o con jwt (a tu elección).

- (Sólo para jwt) desarrollar una estrategia "current" para extraer la cookie que contiene el token para obtener el usuario asociado a dicho token, en caso de tener el token, devolver al usuario asociado al token, caso contrario devolver un error de passport, utilizar un extractor de cookie.

- Agregar al router /api/sessions/ la ruta /current, la cual utilizará el modelo de sesión que estés utilizando, para poder devolver en una respuesta el usuario actual.

Sugerencias:
Te recomendamos trabajar con el modelo de sesión con el cual te sientas más cómodo (sessions / jwt)

## Instrucciones:

Instalar dependencias: npm i

Ejecutar: npm start

## Ejemplos:

Vista Home:
GET http://localhost:8080/

Vista de login:
http://localhost:8080/login

Vista de registro:
http://localhost:8080/register

Vista de productos: (protegida)
http://localhost:8080/products

Vista de perfil: (protegida)
http://localhost:8080/profile

NOTA: si el usuario ya está logueado, no puede volver a loguearse o registrarse.
En ambos casos el usuario es redirigido a la vista de perfil.

## Sistema de roles:

Rol de administrador:

- Usuario: adminCoder@coder.com
- Contraseña: adminCod3r123
