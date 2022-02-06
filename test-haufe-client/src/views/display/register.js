import React from "react";
import {connect} from "react-redux";
import {handleAppRender, handleUserState, register} from "../../actions/app";
import {Link} from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            valid: false,
            renderError: false,
            message: "Passwords mismatch"
        }
    }
    render() {
        return (
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Register Account</h2>
                    </div>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if(e.target.password.value !== e.target.confirmPassword.value)
                                this.setState({valid: false, renderError: true});
                            else {
                                this.setState({valid: true, renderError: false});
                                this.props.dispatch(register(
                                    'basic',
                                    {
                                        email: e.target.email.value,
                                        password: e.target.password.value,
                                        name: e.target.name.value,
                                        action: "/session/register"
                                    }));
                            }
                        }}
                        className="mt-8 space-y-6">
                        {this.state.renderError && !this.state.valid ? (
                            <span className={"text-red-300"}>{this.state.message}</span>
                        ) : null}
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input id="name" name="name" type="text" autoComplete="name" required
                                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                       placeholder="Name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input id="email" name="email" type="email" autoComplete="email" required
                                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                       placeholder="Email address" />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input id="password" name="password" type="password" autoComplete="current-password"
                                       required
                                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                       placeholder="Password" />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="sr-only">Password</label>
                                <input id="confirmPassword" name="confirmPassword" type="password" autoComplete={""}
                                       required
                                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                       placeholder="Confirm Password" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-between">

                            <div className="text-sm text-center flex">
                                <p className={"px-2"}>Go to</p>
                                <Link
                                    to={"#"}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        this.props.changeDisplay("login")
                                    }}
                                    className="font-medium text-indigo-600 hover:text-indigo-500">Login</Link>
                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fillRule="evenodd"
                                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </span>
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    app: state.app
});

export default connect(mapStateToProps)(Register)