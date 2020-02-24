const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = Hero = mongoose.model(
  "hero",
  new Schema({
    type: {
      type: String
    },
    avatar: {
      type: String
    },
    banner: {
      type: String
    },
    delay: {
      type: String
    },
    cost: {
      type: String
    },
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "category" }],
    scores: {
      difficult: { type: Number },
      skills: { type: Number },
      attack: { type: Number },
      survive: { type: Number }
    },
    skills: [
      {
        icon: { type: String },
        name: { type: String },
        description: { type: String },
        tips: { type: String },
        delay:{type:String},
        cost:{type:String}
      }
    ],
    items1: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "item"
      }
    ],
    items2: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "item"
      }
    ],
    usageTips: { type: String },
    battleTips: { type: String },
    teamTips: { type: String },
    parents: [
      {
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: "hero" },
        description: { type: String }
      }
    ]
  })
);
