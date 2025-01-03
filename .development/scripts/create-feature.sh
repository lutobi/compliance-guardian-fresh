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

# Convert feature name for different cases
FEATURE_PASCAL=$(echo "$FEATURE_NAME" | sed -r 's/(^|-)([a-z])/\U\2/g')
FEATURE_LOWER=$(echo "$FEATURE_NAME" | tr '[:upper:]' '[:lower:]')

echo -e "${GREEN}Creating new feature: ${FEATURE_PASCAL}${NC}\n"

# Create directory structure
DIRECTORIES=(
    "src/types/${FEATURE_LOWER}"
    "src/services/${FEATURE_LOWER}"
    "src/hooks/${FEATURE_LOWER}"
    "src/components/${FEATURE_LOWER}"
    "src/tests/${FEATURE_LOWER}"
    "src/docs"
)

for dir in "${DIRECTORIES[@]}"; do
    mkdir -p "$dir"
    echo -e "${GREEN}✓${NC} Created $dir"
done

# Copy and process templates
TEMPLATES_DIR=".development/guides/feature-templates"
TEMPLATES=(
    "service.template.ts:src/services/${FEATURE_LOWER}/index.ts"
    "hook.template.ts:src/hooks/${FEATURE_LOWER}/use${FEATURE_PASCAL}.ts"
    "component.template.tsx:src/components/${FEATURE_LOWER}/${FEATURE_PASCAL}.tsx"
)

for template in "${TEMPLATES[@]}"; do
    SRC="${template%%:*}"
    DEST="${template#*:}"
    
    if [ -f "$TEMPLATES_DIR/$SRC" ]; then
        sed "s/{{FeatureName}}/${FEATURE_PASCAL}/g; s/{{featureName}}/${FEATURE_LOWER}/g" \
            "$TEMPLATES_DIR/$SRC" > "$DEST"
        echo -e "${GREEN}✓${NC} Created $DEST"
    else
        echo -e "${RED}✗${NC} Template $SRC not found"
    fi
done

# Create type definition file
cat > "src/types/${FEATURE_LOWER}/index.ts" << EOL
export interface ${FEATURE_PASCAL}Config {
    // Add your type definitions here
}

export interface ${FEATURE_PASCAL}Data {
    // Add your data interface here
}
EOL
echo -e "${GREEN}✓${NC} Created type definitions"

# Create test file
cat > "src/tests/${FEATURE_LOWER}/${FEATURE_LOWER}.test.ts" << EOL
import { ${FEATURE_PASCAL}Service } from '@/services/${FEATURE_LOWER}';
import { mockSecurityContext } from '@/tests/mocks/security';

describe('${FEATURE_PASCAL}Service', () => {
    let service: ${FEATURE_PASCAL}Service;

    beforeEach(() => {
        service = new ${FEATURE_PASCAL}Service(mockSecurityContext);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    // Add your tests here
});
EOL
echo -e "${GREEN}✓${NC} Created test file"

# Create documentation
cat > "src/docs/${FEATURE_LOWER}.md" << EOL
# ${FEATURE_PASCAL} Feature

## Overview
Brief description of the ${FEATURE_PASCAL} feature.

## Components
- \`${FEATURE_PASCAL}Service\`: Main service class
- \`use${FEATURE_PASCAL}\`: React hook for data fetching
- \`${FEATURE_PASCAL}Component\`: React component

## Usage
\`\`\`typescript
import { use${FEATURE_PASCAL} } from '@/hooks/${FEATURE_LOWER}/use${FEATURE_PASCAL}';

function MyComponent() {
    const { data, isLoading } = use${FEATURE_PASCAL}();
    // Implementation
}
\`\`\`

## Security
Describe security considerations and requirements.

## Testing
Describe testing strategy and requirements.
EOL
echo -e "${GREEN}✓${NC} Created documentation"

echo -e "\n${GREEN}Feature creation complete!${NC}"
echo -e "\nNext steps:"
echo "1. Implement feature types in src/types/${FEATURE_LOWER}/index.ts"
echo "2. Add security context in service implementation"
echo "3. Implement feature logic in service"
echo "4. Add tests"
echo "5. Update documentation"
