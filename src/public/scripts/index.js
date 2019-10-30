/******************************************************************************
 *                          Fetch and display users
 ******************************************************************************/

displayUsers();


function displayUsers() {
    httpGet('/api/users/all')
        .then(response => response.json())
        .then((response) => {
            const allUsers = response.users;
            // Empty the anchor
            const allUsersAnchor = document.getElementById('all-users-anchor');
            allUsersAnchor.innerHTML = '';
            // Append users to anchor
            allUsers.forEach((user) => {
                allUsersAnchor.innerHTML += getUserDisplayEle(user);
            });
        });
}


function getUserDisplayEle(user) {
    return `<div class="user-display-ele">

        <div class="normal-view">
            <div>Name: ${user.name}</div>
            <div>Email: ${user.email}</div>
            <button class="edit-user-btn" data-user-id="${user.id}">
                Edit
            </button>
            <button class="delete-user-btn" data-user-id="${user.id}">
                Delete
            </button>
        </div>
        
        <div class="edit-view">
            <div>
                Name: <input class="name-edit-input" value="${user.name}">
            </div>
            <div>
                Email: <input class="email-edit-input" value="${user.email}">
            </div>
            <button class="submit-edit-btn" data-user-id="${user.id}">
                Submit
            </button>
            <button class="cancel-edit-btn" data-user-id="${user.id}">
                Cancel
            </button>
        </div>
    </div>`;
}


/******************************************************************************
 *                        Add, Edit, and Delete Users
 ******************************************************************************/

document.addEventListener('click', function (event) {
    event.preventDefault();
    const ele = event.target;
    if (ele.matches('#add-user-btn')) {
        addUser();
    } else if (ele.matches('.edit-user-btn')) {
        showEditView(ele.parentNode.parentNode);
    } else if (ele.matches('.cancel-edit-btn')) {
        cancelEdit(ele.parentNode.parentNode);
    } else if (ele.matches('.submit-edit-btn')) {
        submitEdit(ele);
    } else if (ele.matches('.delete-user-btn')) {
        deleteUser(ele);
    }
}, false);


function addUser() {
    const nameInput = document.getElementById('name-input');
    const emailInput = document.getElementById('email-input');
    const data = {
        user: {
            name: nameInput.value,
            email: emailInput.value
        },
    };
    httpPost('/api/users/add', data)
        .then(() => {
            displayUsers();
        })
}


function showEditView(userEle) {
    const normalView = userEle.getElementsByClassName('normal-view')[0];
    const editView = userEle.getElementsByClassName('edit-view')[0];
    normalView.style.display = 'none';
    editView.style.display = 'block';
}


function cancelEdit(userEle) {
    const normalView = userEle.getElementsByClassName('normal-view')[0];
    const editView = userEle.getElementsByClassName('edit-view')[0];
    normalView.style.display = 'block';
    editView.style.display = 'none';
}


function submitEdit(ele) {
    const userEle: HTMLElement = ele.parentNode.parentNode;
    const nameInput = userEle.getElementsByClassName('name-edit-input')[0];
    const emailInput = userEle.getElementsByClassName('email-edit-input')[0];
    const id = ele.getAttribute('data-user-id');
    const data = {
        user: {
            name: nameInput.value,
            email: emailInput.value,
            id: id
        }
    };
	httpPut('/api/users/update', data)
        .then(() => {
            displayUsers();
        })
}


function deleteUser(ele) {
    const id = ele.getAttribute('data-user-id');
	httpDelete('/api/users/delete/' + id)
        .then(() => {
            displayUsers();
        })
}


function httpGet(path) {
    return fetch(path, getOptions('GET'))
}


function httpPost(path, data) {
    return fetch(path, getOptions('POST', data));
}


function httpPut(path, data) {
    return fetch(path, getOptions('PUT', data));
}


function httpDelete(path) {
    return fetch(path, getOptions('DELETE'));
}


function getOptions(verb, data) {
    const options = {
        dataType: 'json',
        method: verb,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    if (data) {
        options.body = JSON.stringify(data);
    }
    return options;
}

