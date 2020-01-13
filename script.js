$(document).ready(function () {
    const getID = id => document.getElementById(id);
    const getSel = sel => document.querySelector(sel);
    let form1 = document.forms.form1;
    let form2 = document.forms.form2;

    let firstName = form1.firstName;
    let lastName = form1.lastName;
    let email = form1.email;
    let password = form1.password;

    debugger
    const key = 'users';
    let libraryUsers = [];
    let keyLocalStorage = localStorage.getItem(key);

    if (keyLocalStorage != null) {
        libraryUsers = JSON.parse(keyLocalStorage);
        console.log(libraryUsers);
    }

    $('.commentF1').hide();
    $('.commentF2').hide();
    $('.loginBox').hide();
    $('.dataCard').hide();

    $('#workMessageSignIn').click(function () {
        $('.registerBox').hide();
        $('.loginBox').show();
    });

    $('#workMessageSignUp').click(function () {
        $('.loginBox').hide();
        $('.registerBox').show();
    });


    $('.btnSignUp').click(function validation() {

        debugger
        if (/^([a-zA-Z])([a-z]{1,19})$/.test(`${firstName.value}`)) {
            $('#firstNameF1').siblings('span').show().html('<i class="fas fa-check"></i>');
            $('#commentFirstNameF1').hide();
            $('#firstNameF1').css('border', '2px inset green');
            $('input').css('margin', '5px 0');
        } else {
            $('#firstNameF1').siblings('span').show().html('<i class="fas fa-times"></i>');
            $('#firstNameF1').css('border', '2px inset red');
            $('#commentFirstNameF1').show();
            $('input').css('margin', '5px 0');
        }

        if (/^([a-zA-Z])([a-z]{1,19})$/.test(`${lastName.value}`)) {
            $('#lastNameF1').siblings('span').show().html('<i class="fas fa-check"></i>');
            $('#commentLastNameF1').hide();
            $('#lastNameF1').css('border', '2px inset green');
        } else {
            $('#lastNameF1').siblings('span').show().html('<i class="fas fa-times"></i>');
            $('#lastNameF1').css('border', '2px inset red');
            $('#commentLastNameF1').show();
        }

        if (/^[a-zA-Z0-9-.]+\@{1}[a-z.]+$/.test(`${email.value}`)) {
            $('#emailF1').siblings('span').show().html('<i class="fas fa-check"></i>');
            $('#commentEmailF1').hide();
            $('#emailF1').css('border', '2px inset green');
        } else {
            $('#emailF1').siblings('span').show().html('<i class="fas fa-times"></i>');
            $('#emailF1').css('border', '2px inset red');
            $('#commentEmailF1').show();
        }

        if (/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{8,15}$/.test(`${password.value}`)) {
            $('#passwordF1').siblings('span').show().html('<i class="fas fa-check"></i>');
            $('#commentPasswordF1').hide();
            $('#passwordF1').css('border', '2px inset green');

        } else {
            $('#passwordF1').siblings('span').show().html('<i class="fas fa-times"></i>');
            $('#passwordF1').css('border', '2px inset red');
            $('#commentPasswordF1').show();

        }



        // VALIDATION FORM 'EMAIL'

        function validationEmail(valueEmail) {
            let isEmailFree = true;
            for (let i = 0; i < libraryUsers.length; i++) {
                if (valueEmail == libraryUsers[i].email) {
                    form1.email.value = '';
                    $('#commentEmailF1').text('This email already exist').show();
                    isEmailFree = false;
                    return;
                }
            }
            if (isEmailFree) {
                $('.commentEmailF1').hide();
            }
        }
        validationEmail(`${email.value}`);

        // create New User

        function createNewUser(fName, sName, email, password) {
            if (!fName || !sName || !email || !password) {
                return;
            } else {
                return {
                    firstName: fName,
                    lastName: sName,
                    email: email,
                    password: password
                }
            }
        }
        let user = createNewUser(firstName.value, lastName.value, email.value, password.value);

        $('input').css('border', '1px inset black');
        $('input').css('margin', '15px 0');
        $('span').hide();


        // PUSH NEW KEY(USER) TO LIBRARY USERS 

        function pushUser(user) {
            if (user == undefined) {
                return;
            }
            libraryUsers.push(user);
            console.log(libraryUsers);
            let usersJson = JSON.stringify(libraryUsers);
            localStorage.setItem(key, usersJson);
            form1.reset();

        }
        pushUser(user)
    })

    $('.btnSignIn').click(function () {
        let isEmailAndPasswordValid = false;
        for (let i = 0; i < libraryUsers.length; i++) {
            if (form2.email.value == libraryUsers[i].email && form2.password.value == libraryUsers[i].password) {
                $('.commentF2').hide();
                $('.loginBox').hide();
                $('.registerBox').hide();
                isEmailAndPasswordValid = true;
                form2.reset();
                $('.rezFirstSecondname').text(libraryUsers[i].firstName + " " + libraryUsers[i].lastName);
                $('.rezEmail').text(libraryUsers[i].email);
                $('.dataCard').show();
                return;
            }
        }
        if (!isEmailAndPasswordValid) {
            $('.commentF2').show();
        }
    })


    $('.btnSignUpDataCard').click(function () {
        $('.loginBox').show();
        $('.dataCard').hide();
        $('.registerBox').hide();
    })


});