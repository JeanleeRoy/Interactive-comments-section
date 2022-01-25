
/* --- Local Storage --- */

function setCurrentUser(user) {
    user = JSON.stringify(user);
    window.localStorage.setItem('cur_user', user);
}

function getCurrentUser() {
    let user  = window.localStorage.getItem('cur_user');
    return JSON.parse(user);
}

function setComments(comments) {
    comments = JSON.stringify(comments);
    window.localStorage.setItem('comments', comments);
}

function getComments() {
    let comments = window.localStorage.getItem('comments');
    if (comments) return JSON.parse(comments);
    console.error('There are no comments');
}

function hasLocalContent() {
     return window.localStorage.getItem('comments') &&
     window.localStorage.getItem('cur_user');
}

function getCommt(id, parentId) {
    let comments = getComments();
    let comnt = comments.find(cmnt => cmnt.id === parentId);
    if (id === parentId)
        return comnt;
    let replies = comnt.replies;
    return replies.find(reply => reply.id === id);
}

function addLocalComnt(comnt) {
    let comments = getComments();
    comments.push(comnt);
    setComments(comments);
}

function addLocalReply(comntId, reply) {
    let comments = getComments();
    let cmntIndex = comments.findIndex(cmnt => cmnt.id === comntId);
    comments[cmntIndex].replies.push(reply);
    setComments(comments);
}

function editLocalComnt(id, parentId, comntText) {
    let comments = getComments();
    let cmntIndex = comments.findIndex(cmnt => cmnt.id === parentId);
    if (id === parentId) {
        comments[cmntIndex].content = comntText;
    } else {
        let replies = comments[cmntIndex].replies;
        let replyIndex = replies.findIndex(reply => reply.id === id);
        comments[cmntIndex].replies[replyIndex].content = comntText;
    }
    setComments(comments);
}

function deleteLocalComnt(id, parentId) {
    let comments = getComments();
    let cmntIndex = comments.findIndex(cmnt => cmnt.id === parentId);
    if (!comments[cmntIndex]) return;
    if (id === parentId) {
        comments.splice(cmntIndex, 1);
    } else {
        let replies = comments[cmntIndex].replies;
        let replyIndex = replies.findIndex(reply => reply.id === id);
        comments[cmntIndex].replies.splice(replyIndex, 1);
    }
    setComments(comments);
}

