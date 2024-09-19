const express = require("express"),
  router = express.Router();

const service = require("../services/post.service");

router.get("/", async (req, res) => {
  const posts = await service.getAllPosts();
  res.send(posts);
});

router.get("/:id", async (req, res) => {
  const post = await service.getPostById(req.params.id);
  if (post == undefined)
    res.status(404).json("No record found for id: " + req.params.id);
  else res.send(post);
});

router.delete("/:id", async (req, res) => {
  const affectedRows = await service.deletePost(req.params.id);
  if (affectedRows == 0)
    res.status(404).json("No record found for id: " + req.params.id);
  else res.send("Deleted succefully!");
});

router.post("/", async (req, res) => {
  await service.addOrEdit(req.body);
  res.status(201).send("Insert Success");
});

router.put("/:id", async (req, res) => {
  const affectedRows = await service.addOrEdit(req.body, req.params.id);
  if (affectedRows == 0)
    res.status(404).json("No record found for id: " + req.params.id);
  else res.send("Updated succefully!");
});

module.exports = router;
