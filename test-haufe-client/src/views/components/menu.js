import React from "react";
import {menuItems} from "../../constants/menu";
import {Link} from "react-router-dom";

export default class Menu extends React.Component {
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
                </ul>
            </div>
        );
    }
}