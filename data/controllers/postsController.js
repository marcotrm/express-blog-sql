const posts = require("../data/postsData");
const db = require("../../dataBase");

//index
async function index(req, res) {
  try {
    const [posts] = await db.query("SELECT * FROM posts");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//show
async function show(req, res) {
  try {
    const [posts] = await db.query("SELECT * FROM posts WHERE id = ?", [
      req.params.id,
    ]);
    if (posts.length === 0) {
      return res.status(404).json({ error: "Post non trovato" });
    }

    const [tags] = await db.query(
      `
      SELECT tags.*
      FROM tags 
      JOIN post_tag ON tags.id = post_tag.tag_id
      WHERE post_tag.post_id = ?`,
      [req.params.id]
    );
    const post = {
      ...posts[0],
      tags: tags,
    };
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//store
function store(req, res) {
  const newId = posts[posts.length - 1].id + 1;

  const newPost = {
    id: newId,
    name: req.body.name,
    ingredients: req.body.ingredients,
    price: req.body.price,
    image: req.body.image,
  };

  posts.push(newPost);

  res.status(201);
  res.json(newPost);
}

//update
function update(req, res) {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    res.status(404);

    return res.json({
      error: "Not Found",
      message: "Post Non Trovato",
    });
  }

  post.name = req.body.name;
  post.ingredients = req.body.ingredients;
  post.price = req.body.price;
  post.image = req.body.image;

  console.log(post);

  res.json(post);
}

//modify
function modify(req, res) {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    res.status(404);

    return res.json({
      error: "Not Found",
      message: "Post Non Trovato",
    });
  }

  if (req.body.titolo) {
    post.titolo = req.body.titolo;
  }
  if (req.body.contenuto) {
    post.contenuto = req.body.contenuto;
  }
  if (req.body.immagine) {
    post.immagine = req.body.immagine;
  }
  if (req.body.tags) {
    post.tags = req.body.tags;
  }

  console.log(post);

  res.json(post);
}

//destroy
async function destroy(req, res) {
  try {
    const [result] = await db.query(" DELETE FROM posts WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Post non trovato" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { index, show, store, update, modify, destroy };
