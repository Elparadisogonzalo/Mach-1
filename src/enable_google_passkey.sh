#!/bin/bash

# Check for a default browser command
if command -v xdg-open &> /dev/null; then
    BROWSER_CMD="xdg-open"
elif command -v open &> /dev/null; then
    BROWSER_CMD="open"  # macOS
else
    echo "No browser launcher found (xdg-open or open)."
    exit 1
fi

echo "Opening Google's Passkey Management page for user setup..."
$BROWSER_CMD "https://myaccount.google.com/signinoptions/passkeys"

echo "Please log in with genyoungclip@gmail.com and follow Google's instructions to create a Passkey."
