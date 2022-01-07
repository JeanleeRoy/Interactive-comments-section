
function deleteUserComnt(comntId) {
    const comnt = document.getElementById('comnt' + comntId);
    comnt.remove();
}

function editUserComnt(btn, comntId, parentId) {
    btn.disabled = true;
    const comnt = document.getElementById('comnt' + comntId);
    const comntArea = comnt.querySelector('.comnt-text');
    let reuser;
    let reuserElem = comntArea.querySelector('.reply-user');
    if (reuserElem) reuser = reuserElem.textContent.slice(1);
    reuserElem.remove();
    let comntText = comntArea.querySelector('p').textContent.trim();
    comntArea.textContent = '';
    comntArea.innerHTML = editBox(comntText, comntId, reuser);
}

function updateUserComnt(btn, comntId) {
    const comnt = document.getElementById('comnt' + comntId);
    const comntArea = comnt.querySelector('.comnt-text');
    let content = comntArea.querySelector('textarea').value;
    let textElem = document.createElement('p');
    if (btn.dataset.reuser)
        textElem.innerHTML = `
            <span class="reply-user">@${btn.dataset.reuser}</span>
        `
    textElem.innerHTML += content;
    comntArea.textContent = '';
    comntArea.appendChild(textElem);
    comnt.querySelector('.edit-btn').disabled = false;
}

function editBox(comntText, comntId, reuser) {
    let inReply = reuser ? `data-reuser="${reuser}"` : '';
    if (!reuser) reuser = "";
    return `
        <textarea placeholder="Add a comment..." rows="4"
            >${comntText}</textarea>
        <button class="btn update-btn" ${inReply}
            onclick="updateUserComnt(this, ${comntId})">
        UPDATE</button>
    `
}

function userBtns(comntId) {
    return `
        <button class="btn delete-btn" 
            onclick="deleteUserComnt(${comntId})">
            <img src="images/icon-delete.svg" alt="">&nbsp; Delete
        </button>
        <button class="btn edit-btn"
            onclick="editUserComnt(this, ${comntId})">
            <img src="images/icon-edit.svg" alt="">&nbsp; Edit
        </button>
    `
}

function currUserTag() {
    return `
        <span class="active-user">you</span>
    `
}

