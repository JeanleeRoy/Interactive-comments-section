
function replyingTo(comntId = 3, parentId = 0) {
    comntElem = document.getElementById('comnt' + comntId);
    comntElem.insertAdjacentHTML("afterend", replyBox(comntId));
}

function replyBox(comntId) {
    return `
        <div class="reply-box" id="box${comntId}" >
            <img src="${currentUser.image.png}" 
                width="40" height="40" class="desktop-only">
            <textarea placeholder="Add a comment..." rows="3"></textarea>
            <div class="reply-action">
                <img src="${currentUser.image.png}" 
                    width="34" height="34" class="mobile-only">
                <button class="btn">REPLY</button>
            </div>
        </div>
    `
}

function replyBtn(comntId) {
    return `
        <button class="btn reply-btn" onclick="replyingTo(${comntId})">
            <img src="images/icon-reply.svg" alt="">&nbsp; Reply
        </button>
    `
}

function userBtns() {
    return `
        <button class="btn delete-btn">
            <img src="images/icon-delete.svg" alt="">&nbsp; Delete
        </button>
        <button class="btn edit-btn">
            <img src="images/icon-edit.svg" alt="">&nbsp; Edit
        </button>
    `
}

function replyComnt(comnt) {
    return `
        <span class="reply-user">@${comnt.replyingTo}</span> 
        ${comnt.content}
    `
}

function currUserTag() {
    return `
        <span class="active-user">you</span>
    `
}