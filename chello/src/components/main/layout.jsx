import React from "react";
import { Header } from "./header";
export const Layout = (props) => {
    return (
        <div>
            <Header></Header>
            <main className="flex justify-center">{props.children}</main>
        </div>
    );
};
