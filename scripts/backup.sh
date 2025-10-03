#!/bin/bash
# cleanup.sh
# Cleanup docker containers, volumes, and networks for ecommerce project
# Run: ./scripts/cleanup.sh

set -e

echo "=== Cleaning up Docker environment ==="

# Stop and remove containers
echo "[Docker] Stopping containers..."
docker compose -f infra/docker-compose.yml down -v

# Remove dangling images
echo "[Docker] Removing dangling images..."
docker image prune -f

# Remove dangling volumes
echo "[Docker] Removing unused volumes..."
docker volume prune -f

# Remove dangling networks
echo "[Docker] Removing unused networks..."
docker network prune -f

echo "=== Cleanup complete! ==="
