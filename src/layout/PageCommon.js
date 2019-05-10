const hasChildren = (location, pages) => {
  let currentPage = pages.find((page) => {
    return page.target.path === location.pathname;
  });
  return !currentPage.endpoint;
};

const getCurrentPageConfig = (pages, location) => {
  const compiledPages = compilePages(pages);
  return compiledPages.find(r => r.target.path === location.pathname);
};

const compilePages = (pages) => {
  const result = [];
  pages.forEach((page) => {
    result.push(page);
    page.sideBar.filter((sbi) => sbi.path).forEach(sbi => {
      if (!pages.find(p => p.target.path === sbi.path)) {
        let newPage = {
          target: sbi,
          sideBar: page.sideBar,
          endpoint: true
        };
        if (page.backTo) {
          newPage.backTo = page.backTo;
        }
        result.push(newPage);
        sbi.parentTitle = page.target.title;
        sbi.parentIcon = page.target.icon;
        sbi.parentPageIcon = page.target.pageIcon;
      }
    });
  });
  return result;
};

export {
  hasChildren,
  compilePages,
  getCurrentPageConfig
}
