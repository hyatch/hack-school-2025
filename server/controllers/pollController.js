const Poll = require("../models/Poll");

// TODO
// ACTIVITY 2a - Implement getPolls function (return all polls)
async function getPolls(){
    const allPolls = await Poll.find();
    return allPolls;
}
// ACTIVITY 2b - Implement getPoll function (get one poll by id)
async function getPoll(id){
    return await Poll.findById(id).exec();
}
// END ACTIVITY 2

// TODO
// ACTIVITY 3a - Implement postPoll function to create a new poll
async function postPoll)
// ACTIVITY 3b - Implement postVote function to cast a vote

// ACTIVITY 3c - Implement module exports
module.exports = {getPolls, getPoll};
// END ACTIVITY 3
