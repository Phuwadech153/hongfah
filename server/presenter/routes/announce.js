const router = require("express").Router();
const { QueryTypes } = require("sequelize");
const conn = require("../../config/database");
const fs = require('fs')
const multer = require("multer");

const storage = multer.diskStorage({
  destination (req, file, cb) {
    const dest = ('./uploads/')
    // const dest = 'uploads/'

    let stat = null
    try {
      stat = fs.statSync(dest)
    } catch (err) {
      fs.mkdirSync(dest)
    }
    if (stat && !stat.isDirectory()) {
      throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"')
    }
    cb(null, dest)
  },
  filename: (req, file, cb) => {
    cb(null, req.body.image)
    
  }
})

const upload = multer(
  {
    dest: './uploads/',
    storage
  }
)

router.post("/news",upload.single("File"), async (req, res) => {
  try {
    const {
      title, 
      date,
      DateEnd,
      MonthShow,
      descrip,
      image,
      DateShow
    } = req.body;
    await conn.query(
      `INSERT INTO news (NewsID,Title,Date,DateEnd,MonthShow,Descrip,Image,DateShow)
          VALUES (DEFAULT, :title,:date,:DateEnd, :MonthShow, :descrip,:image,:DateShow);`,
      {
        replacements: {
          title,
          date,
          DateEnd,
          MonthShow,
          descrip,
          image,
          DateShow
        }, 
        type: QueryTypes.INSERT,
      }
    );
    console.log(req.body.image);
    return res.status(201).json();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});


router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const { announcer, date, time, title } = req.body;
    await conn.query(
      `INSERT INTO announce (id,announcer,date,time,title)
          VALUES (DEFAULT, :announcer,:date,:time,:title);`,
      {
        replacements: {
          announcer,
          date,
          time,
          title,
        },
        type: QueryTypes.INSERT,
      }
    );
    console.log(req.body);
    return res.status(201).json();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});


router.get("/", async (req, res) => {
  try {
    const getDocument = await conn.query(`SELECT * FROM announce ORDER BY id DESC`, {
      type: QueryTypes.SELECT,
    });
    return res.json(getDocument);
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.get("/home", async (req, res) => {
  try {
    const getDocument = await conn.query(`SELECT * FROM announce ORDER BY id DESC LIMIT 3`, {
      type: QueryTypes.SELECT,
    });
    return res.json(getDocument);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/news", async (req, res) => {
  try {
    const getDocument = await conn.query(`SELECT * FROM news `, {
      type: QueryTypes.SELECT,
    });
    return res.json(getDocument);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/news/home", async (req, res) => {
  try {
    const getDocument = await conn.query(`SELECT * FROM news ORDER BY NewsID DESC LIMIT 2 `, {
      type: QueryTypes.SELECT,
    });
    return res.json(getDocument);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
