
#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

const sourcePath = path.join(__dirname, '../assets/tags');
const targetPath = path.join(process.cwd(), 'assets', 'tags');

console.log('--- react-tags: Instalando todos os componentes ---');

// Assegura que a pasta de destino exista
fs.ensureDirSync(targetPath);

// Copia todos os arquivos da origem para o destino
fs.copySync(sourcePath, targetPath);

console.log('--- Instalação completa! ---'); 

