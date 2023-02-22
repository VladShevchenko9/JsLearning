let users = [];

function loadUsers() {
    // @todo: get users from API endpoint
    users.push({
        id: 1,
        firstName: 'Mark',
        lastName: 'Otto',
        email: 'Mark@otto.com',
        phoneNumber: '+38 (095)-142-52-13'
    });
    users.push({
        id: 2,
        firstName: 'Jacob',
        lastName: 'Thornton',
        email: 'Jac@fat.ua',
        phoneNumber: '+38 (091)-214-25-13'
    });
    users.push({
        id: 3,
        firstName: 'Nikk',
        lastName: 'Tikker',
        email: 'Nikk@TKR.ua',
        phoneNumber: '+38 (092)-142-82-18'
    });

}

function getNewUserId() {
    // @todo: delete after API integration
    let maxId = 0;

    for (const user of users) {
        if (maxId < user.id) {
            maxId = user.id;
        }
    }

    maxId++;
    $('#user-id').val(maxId);
}

function addUser() {
    // @todo: call store users API endpoint
    getNewUserId();
    users.push({
        id: parseInt($('#user-id').val()),
        firstName: $('#first_name').val(),
        lastName: $('#last_name').val(),
        email: $('#email').val(),
        phoneNumber: $('#phone').val()
    });
}

function deleteUser(button) {
    const id = parseInt(button.data("user-id"));
    users = users.filter(user => user.id !== id);
}

function editUser() {
    const id = parseInt($('#user-id').val());
    for (let user of users) {
        if (user.id === id) {
            user.firstName = $('#first_name').val();
            user.lastName = $('#last_name').val();
            user.email = $('#email').val();
            user.phoneNumber = $('#phone').val();
            break;
        }
    }
}
