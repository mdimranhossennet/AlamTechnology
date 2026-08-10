const fs = require('fs');
const path = require('path');

const replacements = [
  ['Rumas World Atelier', 'HEB Vision International Atelier'],
  ['Rumas World Boutique', 'HEB Vision International Boutique'],
  ['Rumas World Curators', 'HEB Vision International Curators'],
  ['Rumas World Intelligence', 'HEB Vision International Intelligence'],
  ['Rumas World Editorial', 'HEB Vision International Editorial'],
  ['Rumas World Assistant', 'HEB Vision International Assistant'],
  ['Rumas World CO.', 'HEB Vision International CO.'],
  ['Rumas World Team', 'HEB Vision International Team'],
  ['Rumas World AI', 'HEB Vision International AI'],
  ['Rumas Worldr', 'HEB Vision International'],
  ['Rumas World', 'HEB Vision International'],
  ['Ruma\'s World', 'HEB Vision International'],
  ['RumasWorld', 'HEBVisionInternational'],
  ['rumasworld.com', 'alamtechnology.com'],
  ['rumasworld', 'alamtechnology'],
  ['RUMAS WORLD', 'HEB VISION INTERNATIONAL'],
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
