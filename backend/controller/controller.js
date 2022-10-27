import PostMessages from "../models/postMessages.js";

export const getRoutes = async (req, res) => {
  const { _start, _end, category, q } = req.query;
  console.log("Start and end:" + _start, _end, category, q);
  try {
    if (_start && _end) {
      const postMessages = await PostMessages.find()
        .sort({ date: -1 })
        .limit(4);
      res.status(200).json(postMessages);
    } else if (category) {
      const postMessages = await PostMessages.find({ category });
      res.status(200).json(postMessages);
    } else if (q) {
      let searchCat = q.charAt(0).toUpperCase() + q.slice(1);

      const postMessages = await PostMessages.find({ category: searchCat });
      res.status(200).json(postMessages);
    } else {
      const postMessages = await PostMessages.find();
      res.status(200).json(postMessages);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const postRoutes = async (req, res) => {
  try {
    const post = req.body;
    const newPost = new PostMessages(post);
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const getRoutesById = async (req, res) => {
  try {
    //console.log(req.params);
    const post_id = req.params.id;
    const searchPost = await PostMessages.findById(post_id);
    res.status(200).json(searchPost);
  } catch (error) {
    res.status(409).send(error.message);
  }
};

export const updateRoutes = async (req, res) => {
  try {
    const post_id = req.params.id;
    const post = req.body;
    const updatedPost = await PostMessages.findByIdAndUpdate(post_id, post, {
      new: true,
    });
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(409).send(error.message);
  }
};

export const deleteRoutes = async (req, res) => {
  try {
    const post_id = req.params.id;
    await PostMessages.findByIdAndRemove(post_id);
    res.status(200).json({ msg: "Post deleted!" });
  } catch (error) {
    res.status(409).send(error.message);
  }
};
