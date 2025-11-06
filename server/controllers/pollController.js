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
  try {
    const { id } = req.params;
    const poll = await Poll.findById(id);

    // If no poll is found with that ID
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }
  
    console.log(`Returning poll ${id}`);
    res.status(200).json(poll);
  } catch (error) {
    // This catches invalid ID formats
    console.error("Error fetching poll:", error);
    res.status(400).json({ message: "Invalid Poll ID", error: error.message });
  }
}
// replace {} parameter with req, res
const postPoll = async (req, res) => {
  // Destructure all needed properties from the body
  const { ownerId, title, description, options } = req.body;

  try {
    const poll = new Poll({
      ownerId: ownerId,
      title: title,
      description: description,
      options: options,
    });

    // Wait for the poll to save to the database
    await poll.save();

    // Send a 201 "Created" status with the new poll
    // This is the ONLY response you send on success
    res.status(201).json(poll);
  } catch (error) {
    // If anything goes wrong (e.g., validation error)
    console.error("Error creating poll:", error);
    res.status(400).json({ message: "Error creating poll", error: error.message });
  }
};

// replace pollId and optionId with req, res
const postVote = async (req, res) => {
  const { pollId, optionId } = req.body;

  try {
    // 1. Update the document
    const updateResult = await Poll.updateOne(
      { _id: pollId, "options._id": optionId },
      {
        $inc: { "options.$.count": 1, totalVotes: 1 },
      }
    );

    // Check if the update actually found and modified a document
    if (updateResult.nModified === 0) {
      return res.status(404).json({ message: "Poll or option not found." });
    }

    // 2. Fetch the newly updated poll to send it back
    const updatedPoll = await Poll.findById(pollId);

    console.log(`Vote cast for ${pollId} on option ${optionId}`);

    // 3. Send ONE response with the updated poll
    res.status(200).json(updatedPoll);
    
  } catch (error) {
    console.error("Error casting vote:", error);
    res.status(400).json({ message: "Error casting vote", error: error.message });
  }
};

module.exports = { getPolls, getPoll, postPoll, postVote };
