import {Route, Switch} from "react-router";
import classNames from "classnames";
import React from "react";
import jss from "./jss/PageTitle.jss";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {transitionDuration} from "./jss/CommonStyles";
import PageMenuHeaderTitle from "./PageMenuHeaderTitle";
import {hasChildren} from "./PageCommon";

const createRoute = (page, index, collapsed, hidden, classes) => {
  const getTitle = ({target}) => target.parentTitle ? target.parentTitle : target.title;
  const getIcon = ({target}) => {
    let icon = target.pageIcon ? target.pageIcon : target.icon;
    if (target.parentIcon) {
      icon = target.parentIcon;
    }
    if (target.parentPageIcon) {
      icon = target.parentPageIcon;
    }
    return icon;
  };
  const render = () => (
    <div className={"content"}>
      <div className={classes.icon} data-icon={page.target.parentIcon ? "parent" : "target"}>{getIcon(page)}</div>
      <div className={classNames({[classes.detailsCollapsed]: collapsed || hidden})}>
        <PageMenuHeaderTitle text={getTitle(page)}/>
      </div>
    </div>
  );
  return (
    <Route
      key={`${index}_route_page_title`}
      exact={page.target.exact}
      path={page.target.path}
      render={render}
    />
  );
};

const PageTitle = ({classes, pages, collapsed, hidden, className, animated, goingBackward}) => (
  <div className={classNames(className, classes.root, {
    "animated": animated,
    "not-animated": !animated,
    "forward": !goingBackward,
    "backward": goingBackward,
  })}>
    <Route render={({location}) => {
      if (hasChildren(location, pages)) {
        return (
          <TransitionGroup component={null}>
            <CSSTransition key={location.key} timeout={transitionDuration} classNames={"slide"}>
              <Switch location={location}>
                {pages.map((page, index) => createRoute(page, index, collapsed, hidden, classes))}
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        );
      } else {
        return (
          <Switch location={location}>
            {pages.map((page, index) => createRoute(page, index, collapsed, hidden, classes))}
          </Switch>
        );
      }
    }}/>
  </div>
);

export default jss(PageTitle);
