
import crypto from "crypto";
import { readFile } from "fs/promises";
import path from "path";
import { loadLinks, saveLinks } from "../Models/models.js";

export const postUrlShortner=  async (req, res) => {
  try {
    const { url, shortCode } = req.body;

    if (!url) return res.send("URL required");

    const code = shortCode || crypto.randomBytes(3).toString("hex");

    const links = await loadLinks();

    if (links[code]) return res.send("Code already exists");

    links[code] = url;

    await saveLinks(links);

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error");
  }
}

export const getURLShortner=async (req, res) => {
  try {
    const html = await readFile(path.join("public", "index.html"), "utf-8");
    const links = await loadLinks();

    const list = Object.entries(links)
      .map(
        ([code, url]) => `
        <li>
          <a href="/${code}" target="_blank">
            ${req.protocol}://${req.get("host")}/${code}
          </a>
          <small>${url}</small>
        </li>
      `
      )
      .join("");

    res.send(html.replace("{{shortened_url}}", list));
  } catch (err) {
    console.error(err);
    res.send("Error loading page");
  }
}

export const redirectShortCode=async (req, res) => {
  try {
    const links = await loadLinks();

    if (!links[req.params.code]) {
      return res.send("Not found");
    }

    res.redirect(links[req.params.code]);
  } catch (err) {
    console.error(err);
    res.send("Error");
  }
}