const $comments = document.getElementById("comments");
const $comment = document.getElementById("comment-template");
const $boxComntElem = document.getElementById('user-coment');

function createComment(comnt, parentId) {
    let clone = $comment.content.cloneNode(true);
    clone.querySelector("img").src = comnt.user.image.png;
    clone.querySelector(".comment").id = 'comnt' + comnt.id;
    clone.querySelector(".comnt-username").innerText = comnt.user.username;
    clone.querySelector(".comnt-txt").innerText = comnt.content;
    clone.querySelector(".vote-number").innerText = comnt.score;
    clone.querySelector(".comnt-date").innerText = comnt.createdAt;
    let actionBtns = clone.querySelector(".comment-action");

    if (comnt.user.username === currentUser.username) {
        clone.querySelector(".comnt-username").innerHTML += currUserTag();
        actionBtns.innerHTML = userBtns(comnt.id)
    } else {
        actionBtns.innerHTML = replyBtn(comnt.id, parentId);
    }
    return clone;
}

function sendComent() {
    const comntArea = $boxComntElem.querySelector('textarea');
    let comntText = comntArea.value;
    if (!comntText) return;
    let comntObj = comntObject(comntText, currentUser);
    let comment = createComment(comntObj, comntObj.id);
    $comments.appendChild(comment);
    comntArea.value = "";
}

function comntObject(comntText, user) {
    return {
        id: Math.floor(Math.random() * 1000000),
        content: comntText,
        createdAt: "Today",
        score: 0,
        user: user,
        replies: []
    }
}

function comntTextNode(content, reuser) {
    let contentText = '';
    if (reuser)
        contentText = `<span class="reply-user">@${reuser}</span>&nbsp;`
    contentText += content;
    return contentText;
}

function currUserTag() {
    return `
        <span class="active-user">you</span>
    `
}
