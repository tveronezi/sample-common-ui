import {Route, Switch} from "react-router";
import HideMenus from "@material-ui/icons/ViewHeadline";
import React from "react";
import jss from "./jss/MenuBar.jss";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {transitionDuration} from "./jss/CommonStyles";

const getContent = (content) => {
  if (typeof content === "function") {
    return content();
  }
  return content;
};

const MenuBar = ({classes, pages, className, hidden, setHidden}) => (
  <div className={classNames(className, classes.root)}>
    <div className={classes.icon}>
      <IconButton className={classes.button} aria-label="Delete" onClick={() => {
        setHidden(!hidden);
      }}>
        <HideMenus/>
      </IconButton>
    </div>
    <div>
      <Route render={({location}) => (
        <TransitionGroup component={null}>
          <CSSTransition key={location.key} timeout={transitionDuration} classNames={"slide"}>
            <Switch location={location}>
              {pages.map((page, index) => (
                <Route key={`${index}_route_menu_bar`} exact={page.target.exact} path={page.target.path}
                       render={() => (
                         <div className={classes.content}>{getContent(page.target.menuBar)}</div>
                       )}/>
              ))}
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}/>
    </div>
  </div>
);

export default jss(MenuBar);
