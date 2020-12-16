const Character = require("../models/character");

const getCharacters = async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const postCharacter = async (req, res) => {
  const character = new Character({
    name: req.body.name,
    profession: req.body.profession,
  });
  try {
    const newCharacter = await character.save();
    res.status(201).json(newCharacter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  postCharacter,
  getCharacters
};
