# Demo1

Aplicación web con frontend servido por Nginx, backend Spring Boot y PostgreSQL.

## Estructura

```text
demo1/
├── services/
│   └── backend/
│       ├── src/
│       ├── pom.xml
│       └── Dockerfile
├── frontend/
├── docker-compose.yml
└── README.md
```

## Ejecución

Desde esta carpeta:

```powershell
docker compose up --build -d
```

Abrir <http://localhost:8080>. El endpoint del backend está disponible en
<http://localhost:8080/api/hello>.

Los datos de PostgreSQL se conservan en el volumen Docker `demo1-postgres-data`.
