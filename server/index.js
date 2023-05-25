const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path')
const auth = require("./presenter/authenticate/index");
const document = require("./presenter/routes/document");
const announce = require("./presenter/routes/announce");

const app = express();

// Use Middleware
app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use('/file', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", auth);
app.use("/document", document);
app.use("/announce", announce);

var port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
});
app.timeout = 12000;
