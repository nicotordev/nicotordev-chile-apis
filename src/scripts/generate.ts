/* eslint-disable security/detect-non-literal-fs-filename */
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import path from 'path';

const nameArg = process.argv[2];

if (!nameArg) {
  console.error('❌ Debes proporcionar un nombre. Ej: ts-node generate.ts user');
  process.exit(1);
}

const name = nameArg.toLowerCase();
const pascalName = name.charAt(0).toUpperCase() + name.slice(1);

const paths = {
  controller: `src/controllers/${name}.controller.ts`,
  service: `src/services/${name}.service.ts`,
  route: `src/routes/${name}.route.ts`,
};

const templates = {
  controller: `
// ${pascalName} Controller
import { Request, Response } from 'express';
import * as ${name}Service from '../services/${name}.service';

export const get${pascalName} = (req: Request, res: Response): void => {
  const data = ${name}Service.get();
  res.json(data);
};
`.trim(),

  service: `
// ${pascalName} Service
export const get = (): Record<string, any> => {
  return { message: '${pascalName} service works!' };
};
`.trim(),

  route: `
// ${pascalName} Route
import { Router } from 'express';
import { get${pascalName} } from '../controllers/${name}.controller';

const router = Router();

router.get('/', get${pascalName});

export default router;
`.trim(),
};

for (const [type, filePath] of Object.entries(paths)) {
  const dir = path.dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(filePath, templates[type as keyof typeof templates], 'utf8');
  console.log(`✅ ${type} creado: ${filePath}`);
}
