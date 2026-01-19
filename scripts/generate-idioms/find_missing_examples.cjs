
const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];

if (!filePath) {
  console.error("Please provide a file path");
  process.exit(1);
}

try {
  const content = fs.readFileSync(filePath, 'utf8');
  const idioms = JSON.parse(content);
  
  const missingExamples = idioms.filter(item => !item.examples || item.examples.length === 0);
  
  console.log(JSON.stringify(missingExamples.map(item => ({ id: item.id, idiom: item.idiom, definition: item.definition })), null, 2));
  
} catch (error) {
  console.error("Error reading or parsing file:", error);
}
