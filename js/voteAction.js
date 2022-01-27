// require utilities.js


function voteUp(comntId, parentId) {
    let comnt = getCommt(comntId, parentId);
    let vote = comnt.vote;
    if (vote === undefined) return;
    if (alreadyVote(vote, like=true)) return;
    let userVote = getUserVote(vote.detail);
    userVote.upVote = true;
    vote.score += (1 + userVote.downVote);
    userVote.downVote = false;
    updateLocalComnt(comntId, parentId, comnt);
}

function voteDown(comntId) {

}

function getUserVote(votes) {
    return votes.find(vt => vt.username === currentUser.username);
}

function alreadyVote(vote, like) {
    let userVote = getUserVote(vote.detail)
    if (!userVote) {
        vote.detail.push(voteObj());
        return false;
    }
    return like ? userVote.upVote : userVote.downVote;
}

function voteObj() {
    return {
        username: currentUser.username,
        upVote: false,
        downVote: false
    }
}

function voteDetail(comntId, parentId, voteNumber) {
    return `
        <button class="btn vote-btn" onclick="voteUp(${comntId}, ${parentId})" > + </button>
        <p class="vote-number"> ${voteNumber} </p>
        <button class="btn vote-btn" onclick="voteDown(${comntId})"> - </button>
    `
}