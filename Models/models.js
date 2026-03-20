import { readFile, writeFile } from "fs/promises";
import path from "path";

const FILE_PATH = path.join("data", "links.json");

// LOAD
export const loadLinks = async () => {
  try {
    const data = await readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    await writeFile(FILE_PATH, JSON.stringify({}));
    return {};
  }
};

// SAVE
export const saveLinks = async (links) => {
  await writeFile(FILE_PATH, JSON.stringify(links, null, 2));
};