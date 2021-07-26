# TickQApp Servidor.
## Pasos para iniciar el servidor.
1. Clonar el repositorio y moverse a la rama: `develop`.
2. Correr `npm install`
3. Crear archivo .env como lo indica el archivo `env.example`.
4. Correr `npm start`

## Descripción del Servidor
Se creó el servidor utilizando  _Node JS, Express Js_ conectado a _MongoDB Atlas_.
Existen dos endpoints:
```
[POST] : /add-customer 
[GET] : /get-customers
```
Existe una tabla donde se registran los usuarios, y se realizan consultas para validar en cual de las dos colas sera atendido con mayor rapidez.
Se utlizó la libreria _node-scheudle_ para programar un cron job que permita validar los usuarios en cola que han sido atendidos, se ejecuta cada minuto, por lo tanto, se obtiene en tiempo real el cliente que es atendido. 
