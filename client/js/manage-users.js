$(document).ready(async function () {
    await loadUsers();
    refreshUsersTable();
    $("#phone").inputmask({"mask": "+38 (099)-999-99-99"});

    //@todo: explain it to GIGor
    $('.custom-sort-column').click(function () {
        updateSortOrder($(this));
        parseUsersTable();
        sortUsers();
        refreshUsersTable();
    });

    $(`#add_user`).click(async function () {
        try {
            await addUser();
            refreshUsersTable();
            $('#add_user_modal').modal('hide');
        } catch (e) {
            parseApiValidationErrors(e);
        }
    });

    $('#showAddUserModal').click(function () {
        showAddUserModal();
    });

    $('#edit_user').click(async function () {
        const id = parseInt($('#user-id').val());
        try {
            await editUser(id);
            refreshUsersTable();
            $('#add_user_modal').modal('hide');
        } catch (e) {
            parseApiValidationErrors(e);
        }
    });
});
