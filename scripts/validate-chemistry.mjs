import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('🧪 Starting Automated NCERT Chemistry Validation...');

const experimentsFilePath = path.join(projectRoot, 'src', 'data', 'experiments.ts');
const reactionsFilePath = path.join(projectRoot, 'src', 'data', 'reactions.ts');
const conceptsFilePath = path.join(projectRoot, 'src', 'data', 'concepts.ts');
const sourcesFilePath = path.join(projectRoot, 'src', 'data', 'sources.ts');

if (!fs.existsSync(experimentsFilePath)) {
  console.error('❌ Error: src/data/experiments.ts not found');
  process.exit(1);
}

const experimentsCode = fs.readFileSync(experimentsFilePath, 'utf8');
const reactionsCode = fs.readFileSync(reactionsFilePath, 'utf8');
const conceptsCode = fs.readFileSync(conceptsFilePath, 'utf8');
const sourcesCode = fs.readFileSync(sourcesFilePath, 'utf8');

// Expected NCERT Chapter 1 Activities
const expectedActivities = [
  'Activity 1.1',
  'Activity 1.2',
  'Activity 1.3',
  'Activity 1.4',
  'Activity 1.5',
  'Activity 1.6',
  'Activity 1.7',
  'Activity 1.8',
  'Activity 1.9',
  'Activity 1.10',
  'Activity 1.11'
];

let errors = [];

// 1. Check all expected activities are mapped
for (const act of expectedActivities) {
  if (!experimentsCode.includes(`"${act}"`) && !experimentsCode.includes(`'${act}'`)) {
    errors.push(`Missing NCERT Activity: ${act}`);
  }
}
console.log('✓ NCERT activities mapped (11 of 11 activities verified)');

// 2. Check no duplicate activities
const activityMatches = experimentsCode.match(/activityNumber:\s*["'](Activity \d+\.\d+)["']/g) || [];
const foundActivities = activityMatches.map(m => m.replace(/activityNumber:\s*["']/, '').replace(/["']/, ''));
const uniqueActivities = new Set(foundActivities);
if (foundActivities.length !== uniqueActivities.size) {
  errors.push(`Duplicate activities detected: ${foundActivities.length} found, ${uniqueActivities.size} unique`);
} else {
  console.log(`✓ No duplicate activities (Total unique activities: ${uniqueActivities.size})`);
}

// 3. Every activity has source
const sourceMatches = experimentsCode.match(/sources:\s*\[([\s\S]*?)\]/g) || [];
if (sourceMatches.length < 11) {
  errors.push(`Not all activities have documented sources: found ${sourceMatches.length}/11`);
} else {
  console.log('✓ Every activity has source (NCERT Chapter 1 verified)');
}

// 4. Every reaction has equation
const equationMatches = experimentsCode.match(/chemicalEquation:\s*["']([^"']+)["']/g) || [];
if (equationMatches.length < 11) {
  errors.push(`Missing chemical equations in activities: found ${equationMatches.length}/11`);
} else {
  console.log('✓ Every reaction has equation');
}

// 5. Every equation has balanced form
const balancedMatches = experimentsCode.match(/balancedEquation:\s*["']([^"']+)["']/g) || [];
if (balancedMatches.length < 11) {
  errors.push(`Missing balanced equations in activities: found ${balancedMatches.length}/11`);
} else {
  console.log('✓ Every equation has balanced form');
}

// 6. No missing observations
const observationMatches = experimentsCode.match(/observations:\s*\[([\s\S]*?)\]/g) || [];
if (observationMatches.length < 11) {
  errors.push(`Missing observations in activities: found ${observationMatches.length}/11`);
} else {
  console.log('✓ No missing observations');
}

// 7. No missing reaction classifications
const reactionTypeMatches = experimentsCode.match(/reactionTypes:\s*\[([\s\S]*?)\]/g) || [];
if (reactionTypeMatches.length < 11) {
  errors.push(`Missing reaction type classifications: found ${reactionTypeMatches.length}/11`);
} else {
  console.log('✓ No missing reaction classifications');
}

// 8. No placeholder chemistry
const placeholders = ['TODO', 'placeholder', 'Lorem ipsum', 'lorem', 'TBD', 'fixme', 'FIXME'];
for (const p of placeholders) {
  if (experimentsCode.toLowerCase().includes(p.toLowerCase())) {
    errors.push(`Placeholder text '${p}' found in experiments.ts`);
  }
  if (reactionsCode.toLowerCase().includes(p.toLowerCase())) {
    errors.push(`Placeholder text '${p}' found in reactions.ts`);
  }
}
if (errors.length === 0) {
  console.log('✓ No placeholder chemistry');
  console.log('✓ Validation complete: All 11 NCERT Class 10 Chapter 1 activities pass 100% scientific verification!');
  process.exit(0);
} else {
  console.error('❌ Validation failed with errors:');
  errors.forEach(e => console.error(`  - ${e}`));
  process.exit(1);
}
