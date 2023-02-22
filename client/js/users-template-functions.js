function refreshUsersTable() {
    let html = '';
    for (const user of users) {
        html += `
            <tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.phoneNumber}</td>
                <td>
                    <button type="button" class="btn btn-danger delete-user" data-user-id="${user.id}">Delete</button>
                    <button type="button" class="btn btn-info edit-user" data-user-id="${user.id}">Edit</button>
                </td>
                
            </tr>
        `;
    }
    $('table > tbody').html(html);
    applyEventListeners();
}

function parseUsersTable() {
    // @todo: delete after API integration
    users = [];
    $('table > tbody > tr').each(function (i, element) {
        users.push({
            id: parseInt($(element).find('td:nth-child(1)').text()),
            firstName: $(element).find('td:nth-child(2)').text(),
            lastName: $(element).find('td:nth-child(3)').text(),
            email: $(element).find('td:nth-child(4)').text(),
            phoneNumber: $(element).find('td:nth-child(5)').text()
        });
        $(element).remove();
    });
}

function showEditUserModal(button) {
    const id = parseInt(button.data("user-id"));
    const user = users.find(user => user.id === id);
    $('#user-id').val(user.id);
    $('#first_name').val(user.firstName);
    $('#last_name').val(user.lastName);
    $('#email').val(user.email);
    $('#phone').val(user.phoneNumber);
    $('#add_user_modal h5').html('Edit User');
    $('#add_user').hide();
    $('#edit_user').show();
    $('#add_user_modal').modal('show');
}

function showAddUserModal() {
    $('#user-id').val('');
    $('#first_name').val('');
    $('#last_name').val('');
    $('#email').val('');
    $('#phone').val('');
    $('#add_user_modal h5').html('Add User');
    $('#add_user').show();
    $('#edit_user').hide();
    $('#add_user_modal').modal('show');
}
