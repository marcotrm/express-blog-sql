const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

//router
const postsRouter = require("./routers/postsRouters");
const validationFound = require("./middlewares/validationFound");
const errorsHandler = require("./middlewares/errorHandler");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Server del mio blog");
});

app.use(express.json());

//registro le rotte
app.use("/posts", postsRouter);
app.use(validationFound);
app.use(errorsHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
