
#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

// Obtém o nome do componente passado como argumento
const componentName = process.argv[2];

if (!componentName) {
  console.error('Erro: Por favor, forneça o nome do componente que deseja copiar.');
  console.log('Exemplo: npx react-tags MyComponent.js');
  process.exit(1);
}

const sourceFile = path.join(__dirname, '../assets/tags', componentName);
const targetPath = path.join(process.cwd(), 'assets', 'tags');
const targetFile = path.join(targetPath, componentName);

console.log(`--- react-tags: Copiando ${componentName} ---`);

// Verifica se o arquivo existe no pacote
if (!fs.existsSync(sourceFile)) {
  console.error(`Erro: O componente "${componentName}" não foi encontrado.`);
  process.exit(1);
}

// Assegura que a pasta de destino exista
fs.ensureDirSync(targetPath);

// Copia o arquivo específico para o destino
fs.copySync(sourceFile, targetFile);

console.log(`--- ${componentName} copiado com sucesso para ${targetPath} ---`); 

