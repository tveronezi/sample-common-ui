import {Route, Switch} from "react-router";
import classNames from "classnames";
import React from "react";
import jss from "./jss/SideMenu.jss";
import {transitionDuration} from "./jss/CommonStyles";
import SideMenuEntry, {SideMenuEntryBack} from "./SideMenuEntry";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const createRoute = (page, index, collapsed, pages, setAnimated, setGoingBackward) => {
  const top = page.sideBar.filter((sm) => !sm.bottom);
  const bottom = page.sideBar.filter((sm) => sm.bottom);
  return (
    <Route key={`${index}_route_side_menu`} exact={page.target.exact}
           path={page.target.path}
           render={() => (
             <div className={"content"}>
               <div>
                 <SideMenuEntryBack backTo={page.backTo} collapsed={collapsed} onClick={(event) => {
                   setAnimated(event.animated);
                   setGoingBackward(event.backward);
                 }}/>
                 {top.map((sm, i) => (
                   <SideMenuEntry pages={pages} sm={sm} key={`${i}_top_side_menu`}
                                  index={`${i}_top_side_menu`}
                                  collapsed={collapsed}
                                  onClick={(event) => {
                                    setAnimated(event.animated);
                                    setGoingBackward(event.backward);
                                  }}/>
                 ))}
               </div>
               <div>
                 {bottom.map((sm, i) => (
                   <SideMenuEntry pages={pages} sm={sm} key={`${i}_bottom_side_menu`}
                                  index={`${i}_bottom_side_menu`}
                                  collapsed={collapsed}
                                  onClick={(event) => {
                                    setAnimated(event.animated);
                                    setGoingBackward(event.backward);
                                  }}
                   />
                 ))}
               </div>
             </div>
           )}
    />
  );
};

const SideMenu = ({classes, pages, collapsed, className, animated, setAnimated, goingBackward, setGoingBackward}) => {
  return (
    <div className={classNames(className, classes.root, {
      "animated": animated,
      "not-animated": !animated,
      "forward": !goingBackward,
      "backward": goingBackward,
    })}>
      <Route render={({location}) => {
        return (
          <TransitionGroup component={null}>
            <CSSTransition key={location.key} timeout={transitionDuration} classNames={"slide"}>
              <Switch location={location}>
                {pages.map((page, index) => createRoute(page, index, collapsed, pages, setAnimated, setGoingBackward))}
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        );
      }}/>
    </div>
  );
};

export default jss(SideMenu);
