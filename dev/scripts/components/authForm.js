import React from 'react';
import firebase from 'firebase';

// landing page authenication form
class AuthForm extends React.Component {
    signUp(e) {
        e.preventDefault();
        console.log('signing up');
    }

    signIn(e) {
        e.preventDefault();
        console.log('signing in');
    }

    render() {
        let title = '';
        let buttonText = '';
        let passwordText = '';
        let formAction = () => null;
        let confirmPassword;

        // choose form to display form according to these conditions
        if (this.props.formToDisplay === 'signUp') {
            title = 'Sign Up';
            buttonText = 'Sign Up';
            passwordText = 'Choose a Password';
            formAction = this.signUp;
            confirmPassword = true;
        } else if (this.props.formToDisplay === 'signIn') {
            title = 'Sign In';
            buttonText = 'Sign In';
            passwordText = 'Password';
            formAction = this.signIn;
            confirmPassword = false;
        }

        return (
            <div>
                <h2>{title}</h2>
                <form action="" onSubmit={(e) => {formAction(e)}}>
                    <div>
                        <label htmlFor="auth-email">E-mail</label>
                        <input id="auth-email" type="email" required/>
                    </div>
                    <div>
                        <label htmlFor="auth-password">{passwordText}</label>
                        <input id="auth-password" type="password" required/>
                    </div>
                    {confirmPassword &&
                        <div>
                            <label htmlFor="auth-password">Confirm Password</label>
                            <input id="auth-password-confirm" type="password" required/>
                        </div>
                    }
                    <button type="submit">{buttonText}</button>
                </form>
            </div>
        )
    }
}

export default AuthForm;