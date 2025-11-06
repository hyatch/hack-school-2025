// TODO
// ACTIVITY - Refactor all controller functions to handle requests!

const Poll = require("../models/Poll");

// add req, res to parameters
const getPolls = async (req, res) => {
  const poll = await Poll.find();
  console.log("Returning polls list...");
  res.status(200).json(poll);
};

// replace id with req, res in parameters
const getPoll = async (req, res) => {
  const {id} = req.params;
  const poll = await Poll.findById(id);

  console.log(`Returning poll ${id}`);
  res.status(200).json(poll);
};

// replace {} parameter with req, res
const postPoll = async (req, res) => {
  const {id, title, description, options} = req.body;
  res.status(404).json(poll);

  const poll = new Poll({
    ownerId: ownerId,
    title: title,
    description: description,
    options: options,
  });

  await poll.save();
  res.status(200).json(poll);
};

// replace pollId and optionId with req, res
const postVote = async (req, res) => {
  const {pollId, optionId} = req.body;
  res.status(400).json(poll);

  const updateOption = await Poll.updateOne(
    { _id: pollId, "options._id": optionId },
    {
      $inc: { "options.$.count": 1, totalVotes: 1 },
    }
  );

  res.status(400).json(poll);

  const updatedPoll = await Poll.findById(pollId);

  console.log(`Vote cast for ${pollId} on option ${optionId}`);

  res.status(200).json(poll);
};

module.exports = { getPolls, getPoll, postPoll, postVote };
