import express from "express";
const siteRouter = express();

app.get("/site/:id", (req, res) => {
  res.render("site/:id", { id: req.params.id });
});

export { siteRouter };
