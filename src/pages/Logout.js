import PersonIcon from "@material-ui/icons/Person";
import OutIcon from "@material-ui/icons/ExitToApp";
import React from "react";

const config = {
    bottom: true,
    icon: (<PersonIcon/>),
    title: "Logout",
    action: () => {
        console.log("Logout action");
    },
    rightIcon: (<OutIcon/>)
};

export default config;
