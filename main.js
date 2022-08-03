const BACKEND_URI = '';

function showError(text) {
    const errorLabel = document.getElementById('error');
    errorLabel.innerText = text;
    errorLabel.classList.add('d-block');
    window.addEventListener("keypress", hideError);
}

function hideError() {
    const errorLabel = document.getElementById('error');
    errorLabel.innerText = '';
    errorLabel.classList.remove('d-block');
    window.removeEventListener("keypress", hideError);
}


async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;

    if (!username) {
        showError('Username is required');
        return;
    }
    if (!password) {
        showError('Password is required');
        return;
    }

    const submitButton = document.getElementById('submit');

    try {
        submitButton.disabled = true;
        hideError();
        const response = await fetch(`${BACKEND_URI}/auth`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                remember,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.id) {
            window.location.href = "list.html";
        } else {
            showError(data.message);
        }
    } catch {
        showError('An Error Occurred, Please Try Again Later');
    } finally {
        submitButton.disabled = false;
    }
}

function updateUsers(users, page, maxPage) {
    let usersHTML = '';
    users.forEach(user => {
        usersHTML += `<tr>
                    <th scope="row" class="text-end pe-3">
                        <img src="images/check-circle-fill.svg" alt=""/>
                    </th>
                    <td class="w-60">${user.login}<br><span class="text-secondary">${user.name}</span></td>
                    <td>…<br>Default group</td>
                </tr>`;
    });
    let paginationHTML = '';
    paginationHTML += `<li class="page-item ${(page <= 1) ? 'disabled' : ''}"><a class="page-link border-0 bg-transparent" href="?page=${page-1}" onclick="getUsers(${page-1}); return false;">« Prev</a></li>`;
    for (let i = 1; i <= maxPage; i++) {
        paginationHTML += `<li class="page-item ${(page === i) ? 'active' : ''}"><a class="page-link border-0 ${(page === i) ? 'border-bottom' : ''} bg-transparent" href="?page=${i}" onclick="getUsers(${i}); return false;">${i}</a></li>`;
    }
    paginationHTML += `<li class="page-item ${(page >= maxPage) ? 'disabled' : ''}"><a class="page-link border-0 bg-transparent" href="#" onclick="getUsers(${page+1}); return false;">Next »</a></li>`;

    document.getElementById('users').outerHTML = `<div class="stripe" id="users">
            <table class="table table-striped">
                <tbody>
                ${usersHTML}
                </tbody>
            </table>
            <nav aria-label="Page navigation">
                <ul class="pagination justify-content-center">
                    ${paginationHTML}
                </ul>
            </nav>
        </div>`;
}

async function getUsers(page) {
    try {
        const response = await fetch(`${BACKEND_URI}/users?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (response.status === 401) {
            window.location.href = "login.html";
            return;
        }
        if (data.users) {
            updateUsers(data.users, data.page, data.maxPage);
        }
    } finally {
        //
    }
}

function logout() {
    try {
        // noinspection JSIgnoredPromiseFromCall
        fetch(`${BACKEND_URI}/auth`, {
            method: 'DELETE',
        });
    } finally {
        window.location.href = "login.html";
    }
}