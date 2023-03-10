let users = [];
const API_HOST = "http://127.0.0.1:8000";

async function loadUsers() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: API_HOST + "/user",
            type: "GET",
            success: function (response) {
                users = response;
                resolve();
            },
            error: function () {
                alert('Something went wrong!');
                reject();
            }
        });
    });
}

async function showUser(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: API_HOST + "/user/" + id,
            type: "GET",
            success: function (response) {
                resolve(response.user);
            },
            error: function (error) {
                reject(error.responseJSON);
            }
        });
    });
}

async function addUser() {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: API_HOST + "/user",
            type: "POST",
            data: {
                firstName: $('#first_name').val(),
                lastName: $('#last_name').val(),
                email: $('#email').val(),
                phoneNumber: $('#phone').val()
            },
            success: function (response) {
                users.push(response.user);
                resolve();
            },
            error: function (error) {
                reject(error.responseJSON);
            }
        });
    });
}

async function deleteUser(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: API_HOST + "/user/" + id,
            type: "DELETE",
            success: function (response) {
                console.log(response);
                resolve();
            },
            error: function (error) {
                reject(error.responseJSON);
            }
        });
    });
}


async function editUser(id) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: API_HOST + "/user/" + id,
            type: "PUT",
            data: {
                firstName: $('#first_name').val(),
                lastName: $('#last_name').val(),
                email: $('#email').val(),
                phoneNumber: $('#phone').val()
            },
            success: function (response) {
                for (let user of users) {
                    if (id === user.id) {
                        user = response.user;
                        break;
                    }
                }
                resolve();
            },
            error: function (error) {
                reject(error.responseJSON);
            }
        });
    });
}
