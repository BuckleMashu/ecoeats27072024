const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, 'src','images');
const outputFile = path.join(__dirname, 'src', 'imageImports.js');

const imageFiles = fs.readdirSync(imageDir);

const imports = imageFiles.map(file => 
  `'${file}': require('./images/${file}')`
).join(',\n  ');

const content = `
// This file is auto-generated. Do not edit manually.
export default {
  ${imports}
};
`;

fs.writeFileSync(outputFile, content);

console.log('Image imports generated successfully!');
//DONT TOUCH THIS FILE AT ALL