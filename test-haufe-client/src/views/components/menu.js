import React from "react";
import {menuItems} from "../../constants/menu";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../../actions/app";

class Menu extends React.Component {
    render() {
        return (
            <div className={"flex-grow"}>
                <ul className={"list-none flex flex-row"}>
                {menuItems.map((item, i) => {
                    return (
                        <li
                            key={i}
                            className={"flex-1 flex flex-col items-center"}>
                            <Link
                                className={""}
                                to={item.path}>{item.name}</Link>
                        </li>
                    );
                })}
                    <li className={"flex-1 flex flex-col items-center"}>
                        <button onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            this.props.dispatch(logout())

                        }}>Logout</button>
                    </li>
                </ul>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    app: state.app
});

export default connect(mapStateToProps)(Menu)