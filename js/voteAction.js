// require utilities.js


function voteUp(comntId) {

}

function voteDown(comntId) {

}

function voteDetail(comntId, voteNumber) {
    return `
        <button class="btn vote-btn" onclick="voteUp(${comntId})" > + </button>
        <p class="vote-number"> ${voteNumber} </p>
        <button class="btn vote-btn" onclick="voteDown(${comntId})"> - </button>
    `
}