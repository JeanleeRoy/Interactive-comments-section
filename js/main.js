// require actions.js

const baseURI = "https://raw.githubusercontent.com/JeanleeRoy/Interactive-comments-section/master/data.json";
const $comments = document.getElementById("comments");
const $comment = document.getElementById("comment-template");

let currentUser = {};
let comments = []

function fetchComments() {
    fetch(baseURI)
    .then(res => res.json())
    .then(data => {
        currentUser = data.currentUser;
        comments = data.comments;
        renderComments();
    })
}

function createComment(comnt, parentId) {
    let clone = $comment.content.cloneNode(true);
    clone.querySelector("img").src = comnt.user.image.png;
    clone.querySelector(".comment").id = 'comnt' + comnt.id;
    clone.querySelector(".comnt-username").innerText = comnt.user.username;
    clone.querySelector(".comnt-txt").innerText = comnt.content;
    clone.querySelector(".vote-number").innerText = comnt.score;
    clone.querySelector(".comnt-date").innerText = comnt.createdAt;
    let actionBtn = clone.querySelector(".comment-action");

    if (comnt.user.username === currentUser.username) {
        clone.querySelector(".comnt-username").innerHTML += currUserTag();
        actionBtn.innerHTML = userBtns(comnt.id)
    } else {
        actionBtn.innerHTML = replyBtn(comnt.id, parentId);
    }
    return clone;
}

function repliesContainer(parentId) {
    let container = document.createElement('div');
    container.classList.add('replies-container');
    container.id = "replies"+parentId;
    return container;
}

function renderReplies(parentComnt) {
    let container = repliesContainer(parentComnt.id);
    parentComnt.replies.forEach(comnt => {
        let comment = createComment(comnt, parentComnt.id);
        comment.querySelector(".comnt-txt").innerHTML = replyComntText(comnt);
        container.appendChild(comment);
    })
    $comments.appendChild(container);
}

function renderComments() {
    comments.forEach(comnt => {
        let comment = createComment(comnt, comnt.id);
        $comments.appendChild(comment);
        renderReplies(comnt);
    })
}

fetchComments();