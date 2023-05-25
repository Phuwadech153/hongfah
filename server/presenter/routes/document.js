const router = require("express").Router();
const { QueryTypes } = require("sequelize");
const conn = require("../../config/database");
const fs = require('fs')
// const authenticateUser = require("../authenticate/routes/auth");
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
    cb(null, req.body.FileName)
  }
})

const upload = multer(
  {
    dest: './uploads/',
    storage
  }
)
router.post("/",upload.single("File"), async (req, res) => {
  try {
    const {
      Date,
      StatusDate,
      Title,
      SubjectID,
      SubjectName,
      TeacherName,
      Descrip,
      Status,
      Status2,
      FileName,
      Note1,
      Note2,
      Note3,
      TeachID,
      Sender,
      StudentID,
      ClassYear,
      Major,
      Field,
      Sec1,
      Sec2,
      PayIn,
      StatusDoc1
    
    } = req.body;
    await conn.query(
      `INSERT INTO document (DocID, Date,StatusDate,Title,SubjectID,SubjectName,TeacherName,Descrip,FileName,Status,Status2,Note1,Note2,Note3,TeachID,Sender,StudentID,ClassYear,Major,Field,Sec1,Sec2,PayIn,StatusDoc1)
        VALUES (DEFAULT, :Date,:StatusDate,:Title,:SubjectID,:SubjectName,:TeacherName,:Descrip,:FileName,:Status,:Status2,:Note1,:Note2,:Note3,:TeachID,:Sender,:StudentID,:ClassYear,:Major,:Field,:Sec1,:Sec2,:PayIn,:StatusDoc1);`,
      {
        replacements: {
          Date,
          StatusDate,
          Title,
          SubjectID,
          SubjectName,
          TeacherName,
          Descrip,
          FileName,
          Status,
          Status2,
          Note1,
          Note2,
          Note3,
          TeachID,
          Sender,
          StudentID,
          ClassYear,
          Major,
          Field,
          Sec1,
          Sec2,
          PayIn,
          StatusDoc1,
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
    const getDocument = await conn.query(`SELECT * FROM document`, {
      type: QueryTypes.SELECT,
    });
    return res.json(getDocument);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/byTeacher/:id", async (req, res) => {
  try {
    const getDocument = await conn.query(
      `SELECT * FROM document WHERE TeachID = :id ORDER BY DocID DESC`,
      {
        replacements: { id: req.params.id },
        type: QueryTypes.SELECT,
      }
    );
    return res.json(getDocument);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/byStudent/:id", async (req, res) => {
  try {
    const getDocument = await conn.query(
      `SELECT * FROM document WHERE StudentID = :id ORDER BY DocID DESC`,
      {
        replacements: { id: req.params.id },
        type: QueryTypes.SELECT,
      }
    );
    console.log(getDocument);

    return res.json(getDocument);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/byStaff", async (req, res) => {
  try {
    const getDocument = await conn.query(
      `SELECT * FROM document WHERE Status > 2 ORDER BY DocID DESC`,
      {
        type: QueryTypes.SELECT,
      }
    );
    console.log(getDocument);

    return res.json(getDocument);
  } catch (err) {
    return res.status(500).json(err);
  }
});
router.get("/byDean", async (req, res) => {
  try {
    const getDocument = await conn.query(
      `SELECT * FROM document WHERE Status > 4 ORDER BY DocID DESC`,
      {
        type: QueryTypes.SELECT,
      }
    );
    console.log(getDocument);

    return res.json(getDocument);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/subject", async (req, res) => {
  try {
    console.log(1111);
    const getSubject = await conn.query(
      `SELECT * FROM user JOIN teacher ON user.UserID = teacher.TeachID JOIN subject ON teacher.SubjectID = subject.SubjectID`,
      {
        type: QueryTypes.SELECT,
      }
    );
    console.log(getSubject);
    return res.json(getSubject);
  } catch (err) {
    return res.status(500).json(err);
  }
});


router.patch("/:id", async (req, res) => {

  try {
    if (req.body.Status === undefined){
      throw new Error("not founded status")
    }
    const getDocument = await conn.query(
      `UPDATE document SET Status = :Status, Status2 = :Status2 WHERE DocID = :id`,
      {
        replacements: {
          id: req.params.id,
          Status: req.body.Status,
          Status2: req.body.Status2,

        },
        type: QueryTypes.UPDATE,
      }
    );
    console.log(getDocument);

    return res.json(getDocument);
  } catch (err) {
    console.log(err.message)
    // return res.status(500).json(new Error("not found"));
    return res.status(500).json({message:err.message})
  }
});

router.patch("/bynote1/:id", async (req, res) => {

  try {
    if (req.body.Note1 === undefined){
      throw new Error("not founded note1")
    }
    const getDocument = await conn.query(
      `UPDATE document SET Note1 = :Note1 WHERE DocID = :id`,
      {
        replacements: {
          id: req.params.id,
          Note1: req.body.Note1
        },
        type: QueryTypes.UPDATE,
      }
    );
    console.log(getDocument);

    return res.json(getDocument);
  } catch (err) {
    console.log(err.message)
    // return res.status(500).json(new Error("not found"));
    return res.status(500).json({message:err.message})
  }
});
router.patch("/bynote2/:id", async (req, res) => {

  try {
    if (req.body.Note2 === undefined){
      throw new Error("not founded status")
    }
    const getDocument = await conn.query(
      `UPDATE document SET Note2 = :Note2 WHERE DocID = :id`,
      {
        replacements: {
          id: req.params.id,
          Note2: req.body.Note2,
        },
        type: QueryTypes.UPDATE,
      }
    );
    console.log(getDocument);

    return res.json(getDocument);
  } catch (err) {
    console.log(err.message)
    // return res.status(500).json(new Error("not found"));
    return res.status(500).json({message:err.message})
  }
});
router.patch("/bynote3/:id", async (req, res) => {

  try {
    if (req.body.Note3 === undefined){
      throw new Error("not founded status")
    }
    const getDocument = await conn.query(
      `UPDATE document SET Note3 = :Note3 WHERE DocID = :id`,
      {
        replacements: {
          id: req.params.id,
          Note3: req.body.Note3,
        },
        type: QueryTypes.UPDATE,
      }
    );
    console.log(getDocument);

    return res.json(getDocument);
  } catch (err) {
    console.log(err.message)
    // return res.status(500).json(new Error("not found"));
    return res.status(500).json({message:err.message})
  }
});


router.patch("/statusDoc2/:id", async (req, res) => {
  try {
    if (req.body.Status === undefined){
      throw new Error("not founded status")
    }
    const getDocument = await conn.query(
      `UPDATE document SET StatusDoc2 = :Status WHERE DocID = :id`,
      {
        replacements: {
          id: req.params.id,
          Status: req.body.Status,
        },
        type: QueryTypes.UPDATE,
      }
    );
    console.log(getDocument);
    return res.json(getDocument);
  } catch (err) {
    console.log(err.message)
    // return res.status(500).json(new Error("not found"));
    return res.status(500).json({message:err.message})
  }
});

router.patch("/statusDoc3/:id", async (req, res) => {
  try {
    if (req.body.Status === undefined){
      throw new Error("not founded status")
    }
    const getDocument = await conn.query(
      `UPDATE document SET StatusDoc3 = :Status WHERE DocID = :id`,
      {
        replacements: {
          id: req.params.id,
          Status: req.body.Status,
        },
        type: QueryTypes.UPDATE,
      }
    );
    console.log(getDocument);
    return res.json(getDocument);
  } catch (err) {
    console.log(err.message)
    // return res.status(500).json(new Error("not found"));
    return res.status(500).json({message:err.message})
  }
});
router.patch("/statusDoc4/:id", async (req, res) => {
  try {
    if (req.body.Status === undefined){
      throw new Error("not founded status")
    }
    const getDocument = await conn.query(
      `UPDATE document SET StatusDoc4 = :Status WHERE DocID = :id`,
      {
        replacements: {
          id: req.params.id,
          Status: req.body.Status,
        },
        type: QueryTypes.UPDATE,
      }
    );
    console.log(getDocument);
    return res.json(getDocument);
  } catch (err) {
    console.log(err.message)
    // return res.status(500).json(new Error("not found"));
    return res.status(500).json({message:err.message})
  }
});
router.patch("/statusDoc5/:id", async (req, res) => {
  try {
    if (req.body.Status === undefined){
      throw new Error("not founded status")
    }
    const getDocument = await conn.query(
      `UPDATE document SET StatusDoc5 = :Status WHERE DocID = :id`,
      {
        replacements: {
          id: req.params.id,
          Status: req.body.Status,
        },
        type: QueryTypes.UPDATE,
      }
    );
    console.log(getDocument);
    return res.json(getDocument);
  } catch (err) {
    console.log(err.message)
    // return res.status(500).json(new Error("not found"));
    return res.status(500).json({message:err.message})
  }
});

module.exports = router;
