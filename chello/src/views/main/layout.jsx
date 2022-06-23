import React from "react";
import { Header } from "./header";
export const Layout = (props) => {
    return (
        <div>
            <Header></Header>
            <main>{props.children}</main>
        </div>
    );
};
