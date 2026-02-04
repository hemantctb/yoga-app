#!/bin/bash

# Convert .docx asanas to .md format
# Creates kebab-case filenames and cleans up escaped characters

ASANAS_DIR="./codebase/asanas"
OUTPUT_DIR="./codebase/knowledge/poses"

# Function to convert title to kebab-case
to_kebab_case() {
    echo "$1" | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9-]//g'
}

# Convert each .docx file
for file in "$ASANAS_DIR"/*.docx; do
    # Skip if it's the template
    if [[ "$file" == *"Template"* ]]; then
        continue
    fi

    # Get the base name
    basename=$(basename "$file" .docx)

    # Convert to kebab-case
    kebab_name=$(to_kebab_case "$basename")

    # Skip if already exists
    if [ -f "$OUTPUT_DIR/$kebab_name.md" ]; then
        echo "⏭️  Skipping $basename (already exists)"
        continue
    fi

    echo "✨ Converting: $basename → $kebab_name.md"

    # Convert with pandoc and clean up escaped characters
    pandoc "$file" -f docx -t markdown | \
        sed 's/\\-/-/g' | \
        sed 's/\\"//g' | \
        sed "s/\\'/'/g" > "$OUTPUT_DIR/$kebab_name.md"
done

echo "✅ Conversion complete!"
