const { default: mongoose, model } = require("mongoose");

const OptionSchema = new mongoose.Schema(
    {
        option: String,
        count: Number,
    },
    {
        _id: true
    }
);

const PollSchema = new mongoose.Schema(
    {
        ownerId: String,
        title: String,
        description: String,
        options: [OptionSchema],
        totalVotes: Number
    }
);


const Poll = mongoose.model("Poll", PollSchema);
module.exports = Poll;

