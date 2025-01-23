/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, '..', 'package.json');
const package = require(packagePath);

// Parse current version
const [major, minor, patch] = package.version.split('.').map(Number);

// Increment patch version
package.version = `${major}.${minor}.${patch + 1}`;

// Write back to package.json with proper formatting
fs.writeFileSync(packagePath, JSON.stringify(package, null, 2) + '\n');

console.log(`Version bumped to ${package.version}`);
