import classNames from "classnames";
import React from "react";
import jss from "./jss/SideMenuEntry.jss";
import {Link, Route} from "react-router-dom";
import ArrowRight from "@material-ui/icons/KeyboardArrowRight";
import ArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Tooltip from "@material-ui/core/Tooltip";
import {getCurrentPageConfig} from "./PageCommon";

const DEFAULT_RIGHT_ICON = (<ArrowRight/>);

const SideMenuEntryBack = jss(({backTo, collapsed, classes, onClick}) => {
  if (!backTo) {
    return null;
  }
  const title = `Back to ${backTo.title}`;
  const result = (
    <Link onClick={() => onClick({backward: true, animated: true})} to={backTo.path}
          className={classNames(classes.root, {
            [classes.panelCollapsed]: collapsed
          })}>
      <div className={classNames(classes.icon, "arrow")}><ArrowLeft/></div>
      {!collapsed && <div className={classes.details}>
        <span className={classes.text}>{title}</span>
      </div>}
    </Link>
  );
  if (collapsed) {
    return (
      <Tooltip title={title} placement="right">
        {result}
      </Tooltip>
    );
  }
  return result;
});

const SideMenuEntry = ({classes, sm, index, collapsed, pages, onClick}) => {
  const getEl = (location) => {
    const linkPageConfig = getCurrentPageConfig(pages, {pathname: sm.path});
    const rightIcon = sm.rightIcon ? sm.rightIcon : DEFAULT_RIGHT_ICON;
    let result;
    if (sm.disabled && sm.disabled()) {
      result = (
        <div key={index} className={classNames(classes.root, {
          [classes.panelCollapsed]: collapsed,
          [classes.itemDisabled]: sm.disabled,
          [classes.endpoint]: linkPageConfig.endpoint
        })}>
          <div className={classes.icon}>{sm.icon}</div>
          {!collapsed && <div className={classNames(classes.details, {[classes.detailsCollapsed]: collapsed})}>
            <div><span className={classes.text}>{sm.title}</span></div>
            <div className={"arrow"}>{rightIcon}</div>
          </div>}
        </div>
      );
    } else if (sm.action) {
      result = (
        <div key={index} className={classNames(classes.root, {
          [classes.panelCollapsed]: collapsed
        })} onClick={sm.action}>
          <div className={classes.icon}>{sm.icon}</div>
          {!collapsed && <div className={classNames(classes.details, {[classes.detailsCollapsed]: collapsed})}>
            <div><span className={classes.text}>{sm.title}</span></div>
            <div className={"arrow"}>{rightIcon}</div>
          </div>}
        </div>
      );
    } else {
      const pageConfig = getCurrentPageConfig(pages, location);
      let endpointSelected = false;
      if (pageConfig.target.path === sm.path && pageConfig.endpoint) {
        endpointSelected = true;
      }
      result = (
        <Link key={index} to={sm.path} className={classNames(classes.root, {
          [classes.panelCollapsed]: collapsed,
          [classes.endpointSelected]: endpointSelected,
          [classes.endpoint]: linkPageConfig.endpoint
        })} onClick={() => onClick({backward: false, animated: !linkPageConfig.endpoint})}>
          <div className={classes.icon}>{sm.icon}</div>
          {!collapsed && <div className={classes.details}>
            <div><span className={classes.text}>{sm.title}</span></div>
            <div className={"arrow"}>{rightIcon}</div>
          </div>}
        </Link>
      );
    }
    if (collapsed) {
      return (
        <Tooltip title={sm.title} placement="right">
          {result}
        </Tooltip>
      );
    }
    return result;
  };
  return (<Route render={({location}) => getEl(location)}/>);
};

export {
  SideMenuEntryBack
};
export default jss(SideMenuEntry);
