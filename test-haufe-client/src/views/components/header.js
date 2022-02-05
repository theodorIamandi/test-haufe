import React from "react";
import Menu from "./menu";

export default class Header extends React.Component {
    render() {
        return (
            <div className={"flex flex-row px-12 py-4"}>
                <div className={"flex-grow"}></div>
                <Menu />
            </div>
        );
    }
}