const mongoose = require("mongoose");
const Book = require("../models/book");
const bookController = {
  index: async (req, res) => {
    try {
      let page = req.query.page || 1;
      let limit = 6;
      let book = await Book.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      let totalBooks = await Book.countDocuments();
      let toalPages = Math.ceil(totalBooks / limit);

      let links = {
        nextPage: page == toalPages ? false : true,
        previousPage: page == 1 ? false : true,
        currentPage: page,
        loobableLinks: [],
      };
      for (let index = 0; index < toalPages; index++) {
        let number = index + 1;
        links.loobableLinks.push({ number });
      }
      let response = {
        links,
        data: book,
      };

      return res.json(response);
    } catch (e) {
      return res.json({ msg: "internet server error" });
    }
  },

  store: async (req, res) => {
    let { title, description, categories } = req.body;
    let book = await Book.create({
      title,
      description,
      categories,
    });
    return res.json(book);
  },

  show: async (req, res) => {
    try {
      let { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ msg: "invalid id" });
      }
      let book = await Book.findById(id);
      if (!book) {
        return res.json({ msg: "book not found" });
      }
      return res.json(book);
    } catch (e) {
      return res.json({ msg: "internet server error" });
    }
  },

  destroy: async (req, res) => {
    try {
      let { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ msg: "invalid id" });
      }
      let book = await Book.findByIdAndDelete(id);
      if (!book) {
        return res.json({ msg: "book not found" });
      }
      return res.json(book);
    } catch (e) {
      return res.json({ msg: "internet server error" });
    }
  },

  update: async (req, res) => {
    try {
      let { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.json({ msg: "invalid id" });
      }
      let book = await Book.findByIdAndUpdate(id, { ...req.body });
      if (!book) {
        return res.json({ msg: "book not found" });
      }
      return res.json(book);
    } catch (e) {
      return res.json({ msg: "internet server error" });
    }
  },
};

module.exports = bookController;
