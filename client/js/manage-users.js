$(document).ready(function () {
    loadUsers();
    refreshUsersTable();
    $("#phone").inputmask({"mask": "+38 (099)-999-99-99"});

    $('.custom-sort-column').click(function () {
        updateSortOrder($(this));
        parseUsersTable();
        sortUsers();
        refreshUsersTable();
    });

    $(`#add_user`).click(function () {
        if (userFormIsValid()) {
            addUser();
            refreshUsersTable();
            $('#add_user_modal').modal('hide');
        }
    });

    $('#showAddUserModal').click(function () {
        showAddUserModal();
    });

    $('#edit_user').click(function () {
        if (userFormIsValid()) {
            editUser();
            refreshUsersTable();
            $('#add_user_modal').modal('hide');
        }
    });
});
