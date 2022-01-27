// require utilities.js

function voteUp(comntId, parentId) {
    processVote(comntId, parentId, true);
}

function voteDown(comntId, parentId) {
    processVote(comntId, parentId, false);
}

function processVote(comntId, parentId, like) {
    let comnt = getCommt(comntId, parentId);
    let vote = comnt.vote;
    if (vote === undefined) return;
    if (alreadyVote(vote, like)) return;
    computeVote(vote, like);
    updateLocalComnt(comntId, parentId, comnt);
    let cmtElem = document.getElementById('comnt' + comntId);
    cmtElem.querySelector('.vote-number').innerText = vote.score;
}

function computeVote(vote, like) {
    let userVote = getUserVote(vote.detail);
    let actualVote = like ? 'upVote' : 'downVote',
    revVote = like ? 'downVote' : 'upVote',
    score = vote.score + (like ? 1 : -1) * (1 + userVote[revVote]);
    userVote[actualVote] = true;
    userVote[revVote] = false;
    vote.score = score;
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
        <button class="btn vote-btn" onclick="voteDown(${comntId}, ${parentId})"> - </button>
    `
}