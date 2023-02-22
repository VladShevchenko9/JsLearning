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
            if (e.hasOwnProperty("violations")) {
                const alertDiv = $("#userValidationAlert");
                let divHtml = '';
                for (const violation of e.violations) {
                    divHtml += violation + '<br>';
                }
                alertDiv.html(divHtml);
                alertDiv.show();
            }
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
