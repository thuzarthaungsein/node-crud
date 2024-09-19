const db = require("../db");

module.exports.getAllPosts = async () => {
  const [records] = await db.query("SELECT * FROM posts");
  return records;
};

module.exports.getPostById = async (id) => {
  const [[record]] = await db.query("SELECT * FROM posts WHERE id=?", [id]);
  return record;
};

module.exports.deletePost = async (id) => {
  const [{ affectedRows }] = await db.query("DELETE FROM posts WHERE id=?", [
    id,
  ]);
  return affectedRows;
};

module.exports.addOrEdit = async (obj, id = 0) => {
  const [[[{ affectedRows }]]] = await db.query("CALL insert_update(?,?,?,?)", [
    id,
    obj.content,
    obj.media,
    obj.title,
  ]);
  return affectedRows;
};
