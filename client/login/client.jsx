//handleLogin - user login functionality
const handleLogin = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({ width: "hide" }, 350);

    if ($("user").val() == '' || $("#pass").val() == '') {
        handleError("RAWR! Username or password is empty");
        return false;
    }

    console.log($("input[name=_csrf").val());

    sendAjax('Post', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
    return false;
};

//handleDignup - user signup functionality
const handleSignup = (e) => {
    e.preventDefault();

    $("#domoMessage").animate({ width: "hide" }, 350);
    if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("RAWR! All fields are required!");
        return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
        handleError("RAWR! Passwords do not match!");
        return false;
    }

    sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
    return false;
};

//handleReset - user password reset functionality
const handleReset = (e) => {
    e.preventDefault();

    if ($("#user").val() == '' || $("#oldPass").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("Missing Fields");
        return false;
    }

    if ($("#pass").val() !== $("#pass2").val()) {
        handleError("Passwords do not match");
        return false;
    }

    sendAjax('POST', $("#passForm").attr("action"), $("#passForm").serialize(), redirect);
    return false;
};

//loginWindow - html for the login page
const LoginWindow = (props) => {
    return (
        <form id="loginForm" name="loginForm" onSubmit={handleLogin} action="/login" method="POST" className="mainForm">
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username"/>

            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password"/>
            <input type="hidden" name="_csrf" value={props.csrf}/>
            <input className="formSubmit" type="submit" value="Sign in"/>
        </form>
    );
};

//SignupWindow - html for the signup page
const SignupWindow = (props) => {
    return (
        <form id="signupForm" name="signupForm" onSubmit={handleSignup} action="/signup" method="POST" className="mainForm">

            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />

            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />

            <label htmlFor="pass2">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />

            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="formSubmit" type="submit" value="Sign Up" />
        </form>
    );
};

//ResetWindow - html for the password rest page
const ResetWindow = (props) => {
    return (
        <form id="passForm" name="passForm" onSubmit={handleReset} action="/reset" method="POST" className="mainForm">

            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />

            <label htmlFor="oldPass">Old Password: </label>
            <input id="oldPass" type="password" name="oldPass" placeholder="old password" />
            <label htmlFor="pass">New Password: </label>

            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass2">Password: </label>
            
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="passSubmit" type="submit" value="Change Password" />
        </form>
    );
}

//createLoginWindow - loads up the createLoginWindow for login
const createLoginWindow = (csrf) => {
    ReactDOM.render(
        <LoginWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

//createSignupWindow - loads up the createSignupWindow for signup
const createSignupWindow = (csrf) => {
    ReactDOM.render(
        <SignupWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

//createResetWindow - loads up the createResetWindow for password reset
const createResetWindow = (csrf) => {
    ReactDOM.render(
        <ResetWindow csrf={csrf} />,
        document.querySelector("#content")
    );
};

//setup - makes everythign show up and work
const setup = (csrf) => {
    const loginButton = document.querySelector("#loginButton");
    const signupButton = document.querySelector("#signupButton");
    const resetButton = document.querySelector("#resetButton");

    signupButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSignupWindow(csrf);
        return false;
    });

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        createLoginWindow(csrf);
        return false;
    });

    resetButton.addEventListener("click", (e) => {
        e.preventDefault();
        createResetWindow(csrf);
        return false;
    });

    createLoginWindow(csrf);  //default view
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});