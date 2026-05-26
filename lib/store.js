import fs from 'fs/promises';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const usersFile = path.join(dataDir, 'users.json');

async function ensureFile() {
  try {
    await fs.access(usersFile);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(usersFile, JSON.stringify([]), 'utf8');
  }
}

export async function getUsers() {
  await ensureFile();
  const raw = await fs.readFile(usersFile, 'utf8');
  const list = JSON.parse(raw);
  return new Map(list.map((user) => [user.email, user]));
}

export async function saveUsers(usersMap) {
  await ensureFile();
  const list = Array.from(usersMap.values());
  await fs.writeFile(usersFile, JSON.stringify(list, null, 2), 'utf8');
}