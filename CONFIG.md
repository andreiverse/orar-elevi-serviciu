# School Schedule Configuration Guide

This application can be easily configured by editing the `config.json` file.

## Configuration File: `config.json`

### Structure

```json
{
  "groups": [...],
  "offset": 8,
  "schoolYear": {...},
  "holidays": [...]
}
```

### Fields

#### `groups` (Array of strings)
List of group names that will rotate daily. Each group should be a string.

**Example:**
```json
"groups": [
  "Marc & Maria",
  "Bogdan & Costi",
  "Stefania & Bianca"
]
```

#### `offset` (Number)
The offset to apply when calculating which group has duty on a given day. This allows you to adjust the rotation without changing the group order.

**Example:**
```json
"offset": 8
```

#### `schoolYear` (Object)
Defines the start and end dates of the school year.

**Format:** `YYYY-MM-DD`

**Example:**
```json
"schoolYear": {
  "start": "2025-09-08",
  "end": "2026-08-06"
}
```

#### `holidays` (Array of objects)
List of holiday periods when there are no school duties.

**Fields per holiday:**
- `start`: Start date (format: `YYYY-MM-DD`)
- `end`: End date (format: `YYYY-MM-DD`)
- `name`: Holiday name (optional, for documentation)

**Example:**
```json
"holidays": [
  {
    "start": "2025-12-22",
    "end": "2026-01-07",
    "name": "Winter Break"
  }
]
```

## Making Changes

1. **Edit `config.json`** with your preferred text editor
2. **Restart the application** for changes to take effect:
   - Development: Restart `pnpm dev`
   - Production: Restart the container or run `pnpm start`

## Docker Deployment

### Building the Docker Image

```bash
docker build -t orar-elevi-serviciu .
```

### Running the Container

```bash
docker run -p 3000:3000 orar-elevi-serviciu
```

### With Custom Configuration

You can mount your own `config.json`:

```bash
docker run -p 3000:3000 -v $(pwd)/config.json:/app/config.json orar-elevi-serviciu
```

### Using Docker Compose

Create a `docker-compose.yml`:

```yaml
version: '3.8'
services:
  orar-app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./config.json:/app/config.json
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

## Development

```bash
pnpm install
pnpm dev
```

## Production Build

```bash
pnpm build
pnpm start
```
