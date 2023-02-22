function validateEmail(email) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function validatePhoneNumber(phoneNumber) {
    return phoneNumber.match(/\+38 \(0[4-9][0-9]\)-[0-9]{3}-[0-9]{2}-[0-9]{2}/);
}

function userFormIsValid() {
    const firstName = $('#first_name').val().trim();
    const lastName = $('#last_name').val().trim();
    const email = $('#email').val().trim();
    const phoneNumber = $('#phone').val().trim();
    const id = parseInt($('#user-id').val());

    if (firstName === '' || lastName === '' || email === '' || phoneNumber === '') {
        alert('All the fields are required.');
        return false;
    }

    if (!validatePhoneNumber(phoneNumber)) {
        alert('The phone number is invalid.');
        return false;
    }

    if (!validateEmail(email)) {
        alert('The Email is invalid.');
        return false;
    }

    for (const user of users) {

        if (user.id === id) {
            continue;
        }

        if (user.email === email) {
            alert('The email is already in use.');
            return false;
        }

        if (user.phoneNumber === phoneNumber) {
            alert('The phone umber is already in use.');
            return false;
        }
    }

    return true;
}
