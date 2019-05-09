import SessionsIcon from "@material-ui/icons/PermIdentity";
import React from "react";

const config = {
    exact: false,
    path: "/sessions",
    icon: (<SessionsIcon/>),
    title: "Sessions",
    menuBar: (<div><span>Sessions</span></div>),
    content: (<div>sessions</div>)
};

export {
    SessionsIcon
};
export default config;
