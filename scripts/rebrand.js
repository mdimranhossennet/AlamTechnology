const fs = require('fs');
const path = require('path');

const replacements = [
  ['Rumas World Atelier', 'Alam Technology Atelier'],
  ['Rumas World Boutique', 'Alam Technology Boutique'],
  ['Rumas World Curators', 'Alam Technology Curators'],
  ['Rumas World Intelligence', 'Alam Technology Intelligence'],
  ['Rumas World Editorial', 'Alam Technology Editorial'],
  ['Rumas World Assistant', 'Alam Technology Assistant'],
  ['Rumas World CO.', 'Alam Technology CO.'],
  ['Rumas World Team', 'Alam Technology Team'],
  ['Rumas World AI', 'Alam Technology AI'],
  ['Rumas Worldr', 'Alam Technology'],
  ['Rumas World', 'Alam Technology'],
  ['Ruma\'s World', 'Alam Technology'],
  ['RumasWorld', 'AlamTechnology'],
  ['rumasworld.com', 'alamtechnology.com'],
  ['rumasworld', 'alamtechnology'],
  ['RUMAS WORLD', 'ALAM TECHNOLOGY'],
  ['info@RumasWorld.com', 'info@alamtechnology.com'],
  ['123 Rumas World Avenue', 'Patenga, Chattogram'],
];

const extensions = ['.ts', '.tsx', '.js', '.jsx'];

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && file !== 'node_modules' && file !== '.next') {
      walkDir(fullPath);
    } else if (stat.isFile() && extensions.includes(path.extname(file))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      for (const [from, to] of replacements) {
        content = content.split(from).join(to);
      }
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated:', fullPath.replace(process.cwd() + path.sep, ''));
      }
    }
  });
}

walkDir(path.join(process.cwd(), 'src'));
console.log('\nDone! All branding updated.');
