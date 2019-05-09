import HomeIcon from "@material-ui/icons/Home";
import React from "react";

const config = {
    exact: true,
    path: "/",
    icon: (<HomeIcon/>),
    title: "Auth",
    menuBar: (<div><span>Home</span></div>),
    content: () => (<div/>)
};

export default config;