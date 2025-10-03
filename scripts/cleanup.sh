#!/bin/bash
# backup.sh
# Backup MongoDB, Postgres, and Redis data
# Run: ./scripts/backup.sh

set -e

BACKUP_DIR="./backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR

echo "=== Starting backup: $BACKUP_DIR ==="

# --- MongoDB backup ---
echo "[MongoDB] Dumping databases..."
docker exec local-mongo mongodump -u root -p example --out /dump
docker cp local-mongo:/dump $BACKUP_DIR/mongo
docker exec local-mongo rm -rf /dump

# --- Postgres backup ---
echo "[Postgres] Dumping ecommerce database..."
docker exec local-postgres pg_dump -U postgres ecommerce > $BACKUP_DIR/postgres.sql

# --- Redis backup ---
echo "[Redis] Saving dump.rdb..."
docker cp local-redis:/data/dump.rdb $BACKUP_DIR/redis-dump.rdb

echo "=== Backup complete! Files saved in $BACKUP_DIR ==="
