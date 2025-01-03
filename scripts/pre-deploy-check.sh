#!/bin/bash

# Exit on any error
set -e

echo "🔍 Running Pre-deployment Checks..."

# Check Node.js version
echo "📌 Checking Node.js version..."
if ! node -v | grep -q "$(cat .nvmrc)"; then
    echo "❌ Node.js version mismatch. Please use version specified in .nvmrc"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Type checking
echo "🔎 Running type checks..."
npm run type-check

# Linting
echo "🧹 Running linter..."
npm run lint

# Unit tests
echo "🧪 Running unit tests..."
npm run test

# Build check
echo "🏗️ Checking build..."
npm run build

# Environment variables check
echo "🔐 Checking environment variables..."
node scripts/check-env.js

echo "✅ All pre-deployment checks passed!"
