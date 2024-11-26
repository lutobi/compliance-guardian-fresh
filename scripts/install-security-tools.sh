#!/bin/bash

# Create tools directory
TOOLS_DIR="security-tools"
mkdir -p $TOOLS_DIR
cd $TOOLS_DIR

# Install OWASP ZAP
echo "Installing OWASP ZAP..."
curl -L https://github.com/zaproxy/zaproxy/releases/download/v2.14.0/ZAP_2.14.0_Unix.sh -o zap_installer.sh
chmod +x zap_installer.sh
./zap_installer.sh -q
rm zap_installer.sh

# Install nmap
echo "Installing nmap..."
brew install nmap

# Install API testing tools
echo "Installing API testing tools..."
npm install -g dredd
npm install -g artillery

# Install Mobile Security Framework (MobSF)
echo "Installing MobSF..."
git clone https://github.com/MobSF/Mobile-Security-Framework-MobSF.git mobsf
cd mobsf
./setup.sh

echo "Installation complete!"
