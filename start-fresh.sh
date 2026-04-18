#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🛑 Stopping all running processes...${NC}"

# Kill any existing backend processes (ts-node, node running on port 3001)
echo "Stopping backend processes..."
pkill -f "ts-node.*main.ts" || true
pkill -f "node.*dist/main.js" || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

# Kill any existing frontend processes (next dev, npm on port 3000-3002)
echo "Stopping frontend processes..."
pkill -f "next dev" || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:3002 | xargs kill -9 2>/dev/null || true

echo -e "${GREEN}✓ All processes stopped${NC}"

# Wait a bit for ports to be released
sleep 2

echo -e "${YELLOW}🚀 Starting fresh...${NC}"

# Navigate to project root
cd "$(dirname "$0")"

# Start backend in background
echo "Starting backend on port 3001..."
cd backend
npx ts-node src/main.ts &
BACKEND_PID=$!
echo -e "${GREEN}Backend started (PID: $BACKEND_PID)${NC}"

# Wait for backend to initialize
sleep 5

# Start frontend in background
echo "Starting frontend on port 3002..."
cd ../frontend
npm run dev -- -p 3002 &
FRONTEND_PID=$!
echo -e "${GREEN}Frontend started (PID: $FRONTEND_PID)${NC}"

# Wait for frontend to start
sleep 3

echo -e "${GREEN}✓ Both servers are running!${NC}"
echo ""
echo -e "${YELLOW}📍 Access URLs:${NC}"
echo "Frontend:  http://localhost:3002"
echo "Login:     http://localhost:3002/login"
echo "Backend:   http://localhost:3001/api"
echo "Docs:      http://localhost:3001/api/docs"
echo ""
echo -e "${YELLOW}🔐 Test Credentials:${NC}"
echo "Admin:     admin@smp.com / Admin@123"
echo "Teacher:   john.doe@smp.com / Teacher@123"
echo "Student:   student1@smp.com / Student@123"
echo ""
echo -e "${YELLOW}📌 Press Ctrl+C to stop all servers${NC}"
echo ""

# Keep the script running
wait
