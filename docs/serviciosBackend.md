# Servicios Backend

API REST del sistema de optimización de la cadena de suministro para una
empresa de moda. Todos los endpoints se publican mediante el backend Spring
Boot en `http://localhost:8080`.

## Productos

### Registrar producto

Registra un producto con su código empresarial, información descriptiva y
precio en pesos colombianos.

- **Método:** `POST`
- **URL:** `http://localhost:8080/api/products`

#### Request

```json
{
  "code": "CAM-001",
  "name": "Basic Cotton T-Shirt",
  "description": "White organic cotton t-shirt",
  "price": 89900.0
}
```

#### Respuesta exitosa (`201 Created`)

```json
{
  "id": 1,
  "code": "CAM-001",
  "name": "Basic Cotton T-Shirt",
  "description": "White organic cotton t-shirt",
  "price": 89900.0
}
```

#### Códigos de estado

- `201 Created`: producto registrado correctamente.
- `400 Bad Request`: falta `code`, `name`, `description` o `price`, o el precio es negativo.
- `409 Conflict`: ya existe un producto con el mismo código.

### Listar productos

Devuelve todos los productos registrados con su información principal.

- **Método:** `GET`
- **URL:** `http://localhost:8080/api/products`

#### Respuesta exitosa (`200 OK`)

```json
[
  {
    "id": 1,
    "code": "CAM-001",
    "name": "Basic Cotton T-Shirt",
    "description": "White organic cotton t-shirt",
    "price": 89900.0
  }
]
```

Si no existen productos, la respuesta es `200 OK`:

```json
{
  "message": "No records found"
}
```

#### Códigos de estado

- `200 OK`: lista devuelta correctamente; si está vacía, incluye el mensaje
  `No records found`.

## Tiendas

### Registrar tienda

Registra una tienda de la cadena con su ubicación en Colombia.

- **Método:** `POST`
- **URL:** `http://localhost:8080/api/stores`

#### Request

```json
{
  "code": "STR-BOG-001",
  "name": "Zara Andino",
  "address": "Carrera 11 No. 82-71",
  "city": "Bogota"
}
```

#### Respuesta exitosa (`201 Created`)

```json
{
  "id": 1,
  "code": "STR-BOG-001",
  "name": "Zara Andino",
  "address": "Carrera 11 No. 82-71",
  "city": "Bogota"
}
```

#### Códigos de estado

- `201 Created`: tienda registrada correctamente.
- `400 Bad Request`: falta `code`, `name`, `address` o `city`.
- `409 Conflict`: ya existe una tienda con el mismo código.

### Listar tiendas

Devuelve todas las tiendas registradas y su ubicación.

- **Método:** `GET`
- **URL:** `http://localhost:8080/api/stores`

#### Respuesta exitosa (`200 OK`)

```json
[
  {
    "id": 1,
    "code": "STR-BOG-001",
    "name": "Zara Andino",
    "address": "Carrera 11 No. 82-71",
    "city": "Bogota"
  }
]
```

Si no existen tiendas:

```json
{
  "message": "No records found"
}
```

#### Códigos de estado

- `200 OK`: lista devuelta correctamente; si está vacía, incluye el mensaje
  `No records found`.

## Centros de distribución

### Registrar centro de distribución

Registra un centro que administra la disponibilidad de productos para las
tiendas.

- **Método:** `POST`
- **URL:** `http://localhost:8080/api/distribution-centers`

#### Request

```json
{
  "code": "DC-BOG-001",
  "name": "Bogota Distribution Center",
  "address": "Calle 80 No. 100-20",
  "city": "Bogota"
}
```

#### Respuesta exitosa (`201 Created`)

```json
{
  "id": 1,
  "code": "DC-BOG-001",
  "name": "Bogota Distribution Center",
  "address": "Calle 80 No. 100-20",
  "city": "Bogota"
}
```

#### Códigos de estado

- `201 Created`: centro registrado correctamente.
- `400 Bad Request`: falta `code`, `name`, `address` o `city`.
- `409 Conflict`: ya existe un centro con el mismo código.

### Listar centros de distribución

Devuelve todos los centros de distribución registrados.

- **Método:** `GET`
- **URL:** `http://localhost:8080/api/distribution-centers`

#### Respuesta exitosa (`200 OK`)

```json
[
  {
    "id": 1,
    "code": "DC-BOG-001",
    "name": "Bogota Distribution Center",
    "address": "Calle 80 No. 100-20",
    "city": "Bogota"
  }
]
```

Si no existen centros:

```json
{
  "message": "No records found"
}
```

#### Códigos de estado

- `200 OK`: lista devuelta correctamente; si está vacía, incluye el mensaje
  `No records found`.

## Datos de Muestra

El archivo `services/backend/src/main/resources/data.sql` contiene los
siguientes registros para una empresa de moda con operación en Colombia.

### Productos

| Código | Nombre | Descripción | Precio (COP) |
|---|---|---|---:|
| `CAM-001` | Basic Cotton T-Shirt | White organic cotton t-shirt | 89,900 |
| `JEA-001` | Slim Fit Jeans | Dark blue slim fit denim jeans | 189,900 |
| `VES-001` | Flowing Midi Dress | Black flowing midi dress | 229,900 |
| `CHA-001` | Leather Ankle Boots | Black leather ankle boots | 349,900 |
| `SUD-001` | Oversized Hoodie | Beige oversized cotton hoodie | 159,900 |

### Tiendas

| Código | Nombre | Dirección | Ciudad |
|---|---|---|---|
| `STR-BOG-001` | Zara Andino | Carrera 11 No. 82-71 | Bogota |
| `STR-MDE-001` | Zara El Tesoro | Carrera 25A No. 1A Sur-45 | Medellin |
| `STR-CLO-001` | Zara Chipichape | Calle 38 Norte No. 6N-45 | Cali |

### Centros de distribución

| Código | Nombre | Dirección | Ciudad |
|---|---|---|---|
| `DC-BOG-001` | Bogota Distribution Center | Calle 80 No. 100-20 | Bogota |
| `DC-MDE-001` | Medellin Distribution Center | Carrera 50 No. 14-20 | Medellin |
