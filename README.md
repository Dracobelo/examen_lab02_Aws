# Sistema de Gestión de Clientes y Productos

Este proyecto es una aplicación web que permite el registro, inicio de sesión, visualización de clientes y productos. 

## Tecnologías utilizadas

- **Frontend:** React
- **Backend:** Node.js + Express
- **Base de datos:** PostgreSQL
- **Contenedores:** Docker + Docker Compose

## Requisitos

- Docker
- Docker Compose

## Configuración

Antes de ejecutar la aplicación, asegúrate de **modificar la IP en el archivo `docker-compose.yml`**:

```yaml
frontend:
  environment:
    REACT_APP_API_URL: http://TU_IP_PUBLICA:8000
```

## Ejecutar Contenedores

- docker-compose build
- docker-compose up -d
- docker-compose ps (Observar el funcionamiento de los contenedores)

## Acceso a la aplicación
Una vez que los contenedores estén en ejecución, abre tu navegador y accede a:

**http://TU_IP_PUBLICA:4000**
