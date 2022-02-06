import React from "react";

export default class Create extends React.Component {
    constructor(props) {
        super(props);

        this.display = {
            user: CreateUser
        }
    }
    render() {
        let Component = this.display[this.props.entity]
        return (
            <React.Fragment>
                <Component create={this.props.create} />
            </React.Fragment>
        );
    }
}

class CreateUser extends React.Component {
    render() {
        return (
            <React.Fragment>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        this.props.create({name: e.target.name.value, email: e.target.email.value, role_id: 2})
                    }}>
                    <div>
                        <label htmlFor="name" className="sr-only">Password</label>
                        <input id="name" name="name" type="text" autoComplete="name"
                               required
                               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                               placeholder="Name" />
                    </div>
                    <div>
                        <label htmlFor="Email" className="sr-only">Password</label>
                        <input id="email" name="email" type="email" autoComplete="email"
                               required
                               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                               placeholder="Email" />
                    </div>
                    <div>
                        <button tabIndex={2} type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Create
                        </button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}