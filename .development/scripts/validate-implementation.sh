#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

FEATURE_NAME=$1

if [ -z "$FEATURE_NAME" ]; then
    echo -e "${RED}Error: Feature name is required${NC}"
    exit 1
fi

# Convert feature name to lowercase for directory matching
FEATURE_LOWER=$(echo "$FEATURE_NAME" | tr '[:upper:]' '[:lower:]')

echo -e "${GREEN}Validating implementation for ${FEATURE_NAME}...${NC}\n"

# Check directory structure
echo "Checking directory structure..."
DIRECTORIES=(
    "src/types/${FEATURE_LOWER}"
    "src/services/${FEATURE_LOWER}"
    "src/hooks/${FEATURE_LOWER}"
    "src/components/${FEATURE_LOWER}"
    "src/tests/${FEATURE_LOWER}"
)

for dir in "${DIRECTORIES[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✓${NC} $dir exists"
    else
        echo -e "${YELLOW}⚠${NC} $dir not found"
    fi
done

# Check for type definitions
echo -e "\nChecking type definitions..."
if [ -f "src/types/${FEATURE_LOWER}/index.ts" ]; then
    echo -e "${GREEN}✓${NC} Type definitions found"
else
    echo -e "${YELLOW}⚠${NC} No type definitions found"
fi

# Check for security implementation
echo -e "\nChecking security implementation..."
if grep -q "SecurityContext" "src/services/${FEATURE_LOWER}/index.ts" 2>/dev/null; then
    echo -e "${GREEN}✓${NC} Security context implemented"
else
    echo -e "${YELLOW}⚠${NC} Security context not found"
fi

# Check for tests
echo -e "\nChecking tests..."
TEST_COUNT=$(find "src/tests/${FEATURE_LOWER}" -name "*.test.ts" -o -name "*.test.tsx" 2>/dev/null | wc -l)
if [ "$TEST_COUNT" -gt 0 ]; then
    echo -e "${GREEN}✓${NC} Found $TEST_COUNT test files"
else
    echo -e "${YELLOW}⚠${NC} No tests found"
fi

# Run type checking
echo -e "\nRunning type checking..."
if npm run typecheck --silent; then
    echo -e "${GREEN}✓${NC} Type checking passed"
else
    echo -e "${RED}✗${NC} Type checking failed"
fi

# Check documentation
echo -e "\nChecking documentation..."
if [ -f "src/docs/${FEATURE_LOWER}.md" ]; then
    echo -e "${GREEN}✓${NC} Documentation found"
else
    echo -e "${YELLOW}⚠${NC} No documentation found"
fi

echo -e "\n${GREEN}Validation complete!${NC}"
