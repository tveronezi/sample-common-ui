import React from 'react';
import * as serviceWorker from './serviceWorker';
import {createStore} from "redux";
import ReactDOM from 'react-dom';
import './index.css';
import home from "./pages/Home";
import config from "./pages/Config";
import sessions from "./pages/Sessions";
import logout from "./pages/Logout";
import {App} from "./library";
import {Provider} from "react-redux";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import {createMuiTheme} from "@material-ui/core";
import reducer from "./reducer";

const store = createStore(reducer);
const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    }
});

ReactDOM.render((<Provider store={store}>
    <MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <App config={{
            storagePrefix: "auth-",
            init: {
                collapsed: true,
            },
            pages: [{
                target: home,
                sideBar: [sessions, config, logout]
            }]
        }}/>
    </MuiThemeProvider>
</Provider>), document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
