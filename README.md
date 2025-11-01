
# react-tags

```JavaScript
export default function View( { children, as = "div", ...props } ) {
  const Element = as;
  return(
    <Element { ...props }>
      { children }
    </Element>
  );
}

export default function Text( { children, as = "span", ...props } ) {
  const Element = as;
  return(
    <Element { ...props }>
      { children }
    </Element>
  );
}
```

### **Resumo do Funcionamento**

 1 - npm install react-tags: O NPM instala o pacote react-tags na sua pasta node_modules. Automaticamente, ele roda o script postinstall que, por sua vez, executa o install-all.js. Este script usa o fs-extra para copiar todos os arquivos da pasta node_modules/react-tags/assets/tags para a sua pasta de projeto assets/tags.

 2 - npx react-tags MyComponent.js: O npx encontra o executável react-tags no seu package.json e o executa. O script cli.js é iniciado, lê o argumento MyComponent.js e copia apenas o arquivo MyComponent.js para a sua pasta de projeto assets/tags.

--- 
1 . Estrutura do Projeto
O projeto react-tags terá a seguinte estrutura:
<pre>
/react-tags
├── /assets 
│   └── /tags
│       ├── MyComponent.js
│       ├── AnotherComponent.js
│       └── ...
├── /bin
│   └── cli.js  // Script executado pelo 'npx'
├── package.json
└── README.md
</pre>

2 O package.json
Este é o coração do projeto. Ele definirá os scripts que farão a mágica acontecer.

```json
{
  "name": "react-tags",
  "version": "1.0.0",
  "description": "A collection of reusable React components for your project.",
  "main": "index.js",
  "scripts": {
    "postinstall": "node ./bin/install-all.js"
  },
  "bin": {
    "react-tags": "./bin/cli.js"
  },
  "keywords": [
    "react",
    "components",
    "tags"
  ],
  "author": "Seu Nome",
  "license": "MIT"
}
```

 - "scripts": { "postinstall": "node ./bin/install-all.js" }: Esta linha é o que faz o npm install copiar todos os arquivos. O script postinstall é um hook do NPM que é executado automaticamente após o pacote ser instalado. Ele chamará o nosso script install-all.js.
 - "bin": { "react-tags": "./bin/cli.js" }: Esta propriedade informa ao npx que, quando o usuário rodar npx react-tags, ele deve executar o arquivo bin/cli.js. 

3 O Script para npm install (./bin/install-all.js)
Este script é responsável por copiar a pasta /assets/tags inteira. Ele será chamado automaticamente pelo NPM.

```JavaScript

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
```

 - Nota: Para usar fs-extra, você precisará adicioná-lo como uma dependência de desenvolvimento no seu projeto com npm install fs-extra. Ele simplifica as operações de arquivo. 

4 O Script para npx add (./bin/cli.js)
Este script é o que processa os argumentos e copia apenas o componente específico. Ele será executado quando o usuário rodar npx react-tags [nome-do-componente].

```JavaScript

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
```


