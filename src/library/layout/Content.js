import {Route, Switch} from "react-router";
import React from "react";
import jss from "./jss/Content.jss";
import classNames from "classnames";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {transitionDuration} from "./jss/CommonStyles";

const getContent = (original, setCollapsed, collapsed, setGoingBackward) => {
  if (typeof original === 'function') {
    return original({setSideMenuCollapsed: setCollapsed, sideMenuCollapsed: collapsed, setNavigatingBackward: setGoingBackward});
  }
  return original;
};

const Content = ({classes, pages, className, setCollapsed, collapsed, setGoingBackward}) => (
  <div className={classNames(className, classes.root)}>
    <Route render={({location}) => (
      <TransitionGroup component={null}>
        <CSSTransition key={location.key} timeout={transitionDuration} classNames={"slide"}>
          <Switch location={location}>
            {pages.map((page, index) => (
              <Route key={`${index}_route_content`} exact={page.target.exact} path={page.target.path}
                     render={() => {
                       return (
                         <div className={classes.content}>
                           {getContent(page.target.content, setCollapsed, collapsed, setGoingBackward)}
                         </div>
                       );
                     }}/>
            ))}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )}/>
  </div>
);

export default jss(Content);
