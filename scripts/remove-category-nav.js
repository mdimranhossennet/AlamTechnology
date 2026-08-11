const fs = require('fs');
const path = require('path');
const dir = 'src/components/templates/navbars';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filepath = path.join(dir, file);
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Comment out <CategoryNav /> so it doesn't render
  content = content.replace(/<CategoryNav(?:.*)\/>/g, '{/* CategoryNav Removed */}');
  
  fs.writeFileSync(filepath, content);
  console.log('Removed CategoryNav from', file);
}
