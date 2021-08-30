# Entrega final curso CoderHouse desarrollo Backend. 
API REST desarrollado en Node.js y el framework Express.
### Comenzando
- Para probar el proyecto en funcionamiento podés visitar el sitio web https://finalcoder.herokuapp.com/
- Para tener una copia del proyecto en un servidor local, se debe clonar el repositorio de Git de la siguiente forma. 

`Git clone https://github.com/santdoyle/entregafinal.git`

### Pre-requisitos
Es necesario contar con Node.js instalado y actualizado para que el proyecto funcione de manera correcta.
https://nodejs.org/es/

## Modo deveploment
El proyecto se puede ejecutar en modo development mediante el comando:

`Npm run dev`

De esta forma se utilizará el **archivo de configuración development.env** con el que se pueden definir variables de entorno para el sistema.
La ejecución del servidor, en fase de desarrollo, se encuentra definido en **“MODO FORK”** por defecto, lo cual puede modificarse a través del archivo antes mencionado.

## Modo production
Para producción, se debe ejecutar el comando:

`Npm run prod`

De esta forma se hará uso del **archivo de configuración production.env.**

En modo producción, el servidor se ejecuta por defecto en **“MODO CLUSTER”**, haciendo uso de la librería FOREVER, para mantener online el mismo. La configuración se puede modificar mediante el archivo comentado antes.

## Tests 

- Dentro de la carpeta tests se definen los test unitarios correspondientes al proyecto, haciendo uso de las **librerías Mocha, Chai y supertest.** 

Para correr el test se debe ejecutar el comando: 

`Npm run test`

El comando se ejecuta en modo development, haciendo uso de su respectivo archivo de configuración.

## Aclaraciones

**Bug:**
-Para utilizar la sección de chat de forma correcta, se debe abrir una nueva ventana de chat como “admin”, para enviar y recibir mensajes correctamente.

## Construido con

Algunas de las librerias utilizadas en el proyecto son:

•	Node.js
•	MongoDB
•	Mongoose
•	JWT
•	Websocket
•	Dotenv
•	Ejs
•	Nodemailer
