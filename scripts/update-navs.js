const fs = require('fs');
const path = require('path');
const dir = 'src/components/templates/navbars';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filepath = path.join(dir, file);
  let content = fs.readFileSync(filepath, 'utf8');
  
  // 1. Add Education link before Shop if not there
  if (!content.includes("label: 'Education'") && !content.includes('label: "Education"')) {
    content = content.replace(/\{\s*href:\s*'\/shop',\s*label:\s*'Shop'\s*\}/, "{ href: '/education', label: 'Education' }, { href: '/shop', label: 'Shop' }");
    content = content.replace(/\{\s*label:\s*'Discovery',\s*href:\s*'\/shop'\s*\}/, "{ label: 'Education', href: '/education' }, { label: 'Discovery', href: '/shop' }");
  }

  // 2. Remove the hardcoded Categories Dropdown trigger in NavbarV1 and NavbarV4
  content = content.replace(/<span className="uppercase text-\[13px\] font-bold tracking-widest">Categories<\/span>/, '<span className="uppercase text-[13px] font-bold tracking-widest hidden">Categories</span>');
  content = content.replace(/<span className="uppercase text-\[12px\] font-black tracking-\[0\.2em\]">Categories<\/span>/, '<span className="uppercase text-[12px] font-black tracking-[0.2em] hidden">Categories</span>');

  // Also remove the explicit trigger blocks in Desktop mode for NavbarV4/NavbarV1
  // They look like this: <NavigationMenuItem> ... Categories ... </NavigationMenuItem>
  // Let's just find "Categories" within a span or div that triggers the dropdown and hide it.
  content = content.replace(/<span className="uppercase text-\[13px\] font-bold tracking-widest group-hover:text-primary transition-colors">Categories<\/span>/, '<span className="uppercase text-[13px] font-bold tracking-widest group-hover:text-primary transition-colors hidden">Categories</span>');
  
  // For Aarong template
  content = content.replace(/<h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Categories<\/h4>/, '<h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 hidden">Categories</h4>');
  
  // 3. Remove from mobile menu (Accordion item for Categories)
  content = content.replace(/<AccordionTrigger className="py-2 hover:no-underline uppercase text-\[12px\] font-bold tracking-\[0\.2em\] text-left">Categories<\/AccordionTrigger>/, '<AccordionTrigger className="py-2 hover:no-underline uppercase text-[12px] font-bold tracking-[0.2em] text-left hidden">Categories</AccordionTrigger>');

  fs.writeFileSync(filepath, content);
  console.log('Updated', file);
}
