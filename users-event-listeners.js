function applyEventListeners() {
    $('button.delete-user').click(function () {
        deleteUser($(this));
        refreshUsersTable();
    });

    $('button.edit-user').click(function () {
        showEditUserModal($(this));
    });
}
