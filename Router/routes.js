import { Router } from "express";
import { getURLShortner, postUrlShortner, redirectShortCode } from "../controllers/postShortner.controller.js";

const router = Router();

// ================= HOME =================
router.get("/",getURLShortner );

// ================= CREATE =================
router.post("/", postUrlShortner);

// ================= REDIRECT =================
router.get("/:code", redirectShortCode);

/*
how to render the data in the ejs file using the render method of the response object and passing the data as an object to the render method and then we can access the data in the ejs file using the name of the key of the object that we passed to the render method .

router.get("/report",(req,res)=>{
  const student =[{ name:"Tirtha Ghosh", age:21, cource:"MERN Stack", batch:"Thapa Technical" },
    {name:"Mohit Kumar", age:22, cource:"MERN Stack", batch:"Thapa Technical" },
    {name:"Satyarth", age:21, cource:"MERN Stack", batch:"Thapa Technical" },
    {name:"Shivam", age:21, cource:"MERN Stack", batch:"Thapa Technical" },
    {name:"Satyarth", age:21, cource:"MERN Stack", batch:"Thapa Technical" },
  ]
  res.render('report',{student});
})

*/

export default router;