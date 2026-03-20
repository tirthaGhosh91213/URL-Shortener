import { Router } from "express";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import crypto from "crypto";
// import { name } from "ejs";

const router = Router();

const FILE_PATH = path.join("data", "links.json");

// LOAD
const loadLinks = async () => {
  try {
    const data = await readFile(FILE_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    await writeFile(FILE_PATH, JSON.stringify({}));
    return {};
  }
};

// SAVE
const saveLinks = async (links) => {
  await writeFile(FILE_PATH, JSON.stringify(links, null, 2));
};

// ================= HOME =================
router.get("/", async (req, res) => {
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
});

// ================= CREATE =================
router.post("/", async (req, res) => {
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
});
router.get("/report",(req,res)=>{
  const student =[{ name:"Tirtha Ghosh", age:21, cource:"MERN Stack", batch:"Thapa Technical" },
    {name:"Mohit Kumar", age:22, cource:"MERN Stack", batch:"Thapa Technical" },
    {name:"Satyarth", age:21, cource:"MERN Stack", batch:"Thapa Technical" },
    {name:"Shivam", age:21, cource:"MERN Stack", batch:"Thapa Technical" },
    {name:"Satyarth", age:21, cource:"MERN Stack", batch:"Thapa Technical" },
  ]
  res.render('report',{student});
})

// ================= REDIRECT =================
router.get("/:code", async (req, res) => {
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
});

export default router;