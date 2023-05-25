/* eslint-disable */
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const conn = require("../../../config/database");
const { QueryTypes } = require("sequelize");

const authenticateUser = require("./auth");

const KEY =
  "81ed561fba4c2693700fe9b445050fb19cf80375bd42e7e86dff26d7424f7f889ee3a7c126018814394dfa7e26be36416af1894146ab966c177c74163dfe2522";

const generateUserToken = (account) => {
  return jwt.sign(
    {
      UserID: account.UserID,
      AccountName: account.AccountName,
      Password: account.Password,
    },
    KEY,
    {
      expiresIn: 86400,
    }
  );
};

// get user
router.get("/callback", authenticateUser, (req, res) => {
  res.json({ user: req.UserID });
});

router.get("/profile", authenticateUser, (req, res) => {
  res.json(req.userDetail);
});


router.post("/login", async (req, res) => {
  try {
    const { accountName, password } = req.body;
    const getRole = await conn.query(
      `SELECT RoleID FROM user WHERE AccountName = :accountName AND Password = :password`,
      {
        replacements: {
          accountName,
          password,
        },
        type: QueryTypes.SELECT,
      }
    );

    if (getRole.length > 0) {
      let getUser
      if(getRole[0].RoleID === 1){
        getUser = await conn.query(
          `SELECT * FROM user JOIN student ON user.UserID = student.StudID  WHERE AccountName = :accountName AND Password = :password`,
          {
            replacements: {
              accountName,
              password,
            },
            type: QueryTypes.SELECT,
          }
        );
      }else if(getRole[0].RoleID === 2){
        getUser = await conn.query(
          `SELECT * FROM user JOIN teacher ON user.UserID = teacher.TeachID JOIN subject ON teacher.SubjectID = subject.SubjectID WHERE AccountName = :accountName AND Password = :password`,
          {
            replacements: {
              accountName,
              password,
            },
            type: QueryTypes.SELECT,
          }
        );
      }else if(getRole[0].RoleID === 3){
        getUser = await conn.query(
          `SELECT * FROM user WHERE AccountName = :accountName AND Password = :password`,
          {
            replacements: {
              accountName,
              password,
            },
            type: QueryTypes.SELECT,
          }
        );
      }else if(getRole[0].RoleID === 4){
        getUser = await conn.query(
          `SELECT * FROM user WHERE AccountName = :accountName AND Password = :password`,
          {
            replacements: {
              accountName,
              password,
            },
            type: QueryTypes.SELECT,
          }
        );
      }
      const token = generateUserToken(getUser[0]);
      return res.json({
        user: getUser[0],
        accessToken: token,
      });

    } else {
      res.sendStatus(401);
    }
    // ------------------------------------------------
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.delete("/logout", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;




