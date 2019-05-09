const expandedLeftSize = "280px";
const collapsedLeftSize = "60px";
const padding = "10px";
const headerSize = "70px";
const darkGrey = "#eeeeee";
const grey = "#fafafa";
const lightGrey = "#ffffff";
const highlighed = "#dce8ec";
const transitionDuration = 300;
const transitionHideDuration = 300;
const noAnimationStyles = {
  "&.slide-exit": {
    display: "none",
  },
};
const slideStyles = {
  "&.slide-enter": {
    transition: `transform ${transitionDuration}ms ease-in-out`,
    transform: "translate(100%)",
  },
  "&.slide-enter-active": {
    transform: "translate(0)",
  },
  "&.slide-exit-active": {
    transform: "translate(100%)",
  },
  "&.slide-exit": {
    transition: `transform ${transitionDuration}ms ease-in-out`,
    transform: "translate(-100%)",
  },
};
const slideBackwardStyles = {
  "&.slide-enter": {
    transition: `transform ${transitionDuration}ms ease-in-out`,
    transform: "translate(-100%)",
  },
  "&.slide-enter-active": {
    transform: "translate(0)",
  },
  "&.slide-exit-active": {
    transform: "translate(200%)",
  },
  "&.slide-exit": {
    transition: `transform ${transitionDuration}ms ease-in-out`,
    transform: "translate(100%)",
  },
};
const fadeStyles = {
  opacity: 1,
  transition: `opacity ${transitionDuration / 2}ms ease-in-out`,
  "&.slide-enter": {
    opacity: 0
  },
  "&.slide-enter-active": {
    transitionDelay: `${transitionDuration / 2}ms`,
    opacity: 1
  },
  "&.slide-exit": {
    opacity: 0
  },
};
export {
  expandedLeftSize,
  collapsedLeftSize,
  padding,
  headerSize,
  darkGrey,
  grey,
  lightGrey,
  highlighed,
  transitionDuration,
  transitionHideDuration,
  slideStyles,
  fadeStyles,
  noAnimationStyles,
  slideBackwardStyles,
}
