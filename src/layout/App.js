import React, {useEffect, useState} from "react";
import jss from "./jss/App.jss";
import {BrowserRouter, Route} from "react-router-dom";
import Loading from "./Loading";
import PageTitle from "./PageTitle";
import MenuBar from "./MenuBar";
import Content from "./Content";
import SideMenu from "./SideMenu";
import arrowLeft from "./images/collapse.svg";
import arrowRight from "./images/expand.svg";
import classNames from "classnames";
import {CSSTransition} from "react-transition-group";
import {transitionDuration, transitionHideDuration} from "./jss/CommonStyles";
import {compilePages} from "./PageCommon";

const getInitValues = (config) => {
  const key = config.storagePrefix ? config.storagePrefix : "system-values-";
  const storage = window.sessionStorage;
  let saveInit = {};
  if (storage.getItem(key)) {
    saveInit = JSON.parse(storage.getItem(key))
  }
  if (config.init) {
    return {
      ...config.init,
      ...saveInit
    }
  }
  return saveInit;
};

const saveInit = (config, init) => {
  const key = config.storagePrefix ? config.storagePrefix : "system-values-";
  const storage = window.sessionStorage;
  storage.setItem(key, JSON.stringify(init));
};


const App = ({classes, config}) => {
  const init = getInitValues(config);
  const {pages} = config;
  const [hidden, setHidden] = useState(init.hidden);
  const [collapsed, setCollapsed] = useState(init.collapsed);
  const [animated, setAnimated] = useState(true);
  const [goingBackward, setGoingBackward] = useState(false);
  const setCollapsedIntercept = (value) => {
    init.collapsed = value;
    saveInit(config, init);
    setCollapsed(value);
  };
  const setHiddenIntercept = (value) => {
    init.hidden = value;
    saveInit(config, init);
    setHidden(value);
  };
  useEffect(() => {
    window.addEventListener("popstate", () => {
      setGoingBackward(true);
    }, {once: true, capture: true});
  });
  return (
    <BrowserRouter>
      <Loading/>
      <CSSTransition in={true} appear={true} timeout={transitionDuration} classNames="fade">
        <CSSTransition in={hidden} appear={hidden} timeout={transitionHideDuration} classNames="hidden">
          <CSSTransition in={collapsed} appear={collapsed} timeout={transitionHideDuration} classNames="collapsed">
            <Route render={() => {
              const compiledPages = compilePages(pages);
              return (
                <div className={classNames(classes.root, {
                  [classes.hiddenPanel]: hidden,
                  [classes.collapsedPanel]: collapsed
                })}>
                  <div className={"left"}>
                    <PageTitle className={classes.top} pages={compiledPages} hidden={hidden}
                               collapsed={collapsed}
                               animated={animated}
                               goingBackward={goingBackward}
                    />
                    <SideMenu pages={compiledPages}
                              hidden={hidden}
                              collapsed={collapsed}
                              animated={animated}
                              setAnimated={setAnimated}
                              goingBackward={goingBackward}
                              setGoingBackward={setGoingBackward}
                    />
                    <div className={classes.collapseBtn} onClick={() => {
                      setCollapsedIntercept(!collapsed);
                    }}>
                      {collapsed ? (<img alt={"Collapse"} src={arrowRight}/>) : (
                        <img alt={"Collapse"} src={arrowLeft}/>)}
                    </div>
                  </div>
                  <div className={"right"}>
                    <MenuBar className={classes.top} pages={compiledPages} hidden={hidden}
                             setHidden={setHiddenIntercept}/>
                    <Content pages={compiledPages} setCollapsed={setCollapsed} collapsed={collapsed} setGoingBackward={setGoingBackward} />
                  </div>
                </div>
              );
            }}/>
          </CSSTransition>
        </CSSTransition>
      </CSSTransition>
    </BrowserRouter>
  );
};

export default jss(App);
