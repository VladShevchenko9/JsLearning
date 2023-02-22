function applyEventListeners() {
    $('button.delete-user').click(async function () {
        const id = parseInt($(this).data("user-id"));
        await deleteUser(id);
        await loadUsers();
        refreshUsersTable();
    });

    $('button.edit-user').click(function () {
        showEditUserModal($(this));
    });
}
