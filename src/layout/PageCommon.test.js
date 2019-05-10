import {compilePages, getCurrentPageConfig} from "./PageCommon";

const getPrettyJson = (json) => JSON.stringify(json, null, 2);

it('should compile the pages properly', () => {
  const a = {
    title: "a",
    path: "/a",
    icon: "A"
  };
  const aa = {
    title: "aa",
    path: "/aa",
    icon: "AA"
  };
  const aaa = {
    title: "aaa",
    path: "/aaa",
    icon: "AAA"
  };
  const aab = {
    title: "aab",
    path: "/aab",
    icon: "AAB"
  };
  const ab = {
    title: "ab",
    path: "/ab",
    icon: "AB"
  };
  const pages = [{
    target: a,
    sideBar: [
      aa,
      ab
    ]
  }, {
    target: aa,
    sideBar: [
      aaa,
      aab
    ],
    backTo: a
  }];
  const compiled = compilePages(pages, {
    pathname: ""
  });
  const result = getPrettyJson(compiled);
  const expected = [
    {
      "target": {
        "title": "a",
        "path": "/a",
        "icon": "A"
      },
      "sideBar": [
        {
          "title": "aa",
          "path": "/aa",
          "icon": "AA"
        },
        {
          "title": "ab",
          "path": "/ab",
          "icon": "AB",
          "parentTitle": "a",
          "parentIcon": "A"
        }
      ]
    },
    {
      "target": {
        "title": "ab",
        "path": "/ab",
        "icon": "AB",
        "parentTitle": "a",
        "parentIcon": "A"
      },
      "sideBar": [
        {
          "title": "aa",
          "path": "/aa",
          "icon": "AA"
        },
        {
          "title": "ab",
          "path": "/ab",
          "icon": "AB",
          "parentTitle": "a",
          "parentIcon": "A"
        }
      ],
      "endpoint": true
    },
    {
      "target": {
        "title": "aa",
        "path": "/aa",
        "icon": "AA"
      },
      "sideBar": [
        {
          "title": "aaa",
          "path": "/aaa",
          "icon": "AAA",
          "parentTitle": "aa",
          "parentIcon": "AA"
        },
        {
          "title": "aab",
          "path": "/aab",
          "icon": "AAB",
          "parentTitle": "aa",
          "parentIcon": "AA"
        }
      ],
      "backTo": {
        "title": "a",
        "path": "/a",
        "icon": "A"
      }
    },
    {
      "target": {
        "title": "aaa",
        "path": "/aaa",
        "icon": "AAA",
        "parentTitle": "aa",
        "parentIcon": "AA"
      },
      "sideBar": [
        {
          "title": "aaa",
          "path": "/aaa",
          "icon": "AAA",
          "parentTitle": "aa",
          "parentIcon": "AA"
        },
        {
          "title": "aab",
          "path": "/aab",
          "icon": "AAB",
          "parentTitle": "aa",
          "parentIcon": "AA"
        }
      ],
      "endpoint": true,
      "backTo": {
        "title": "a",
        "path": "/a",
        "icon": "A"
      }
    },
    {
      "target": {
        "title": "aab",
        "path": "/aab",
        "icon": "AAB",
        "parentTitle": "aa",
        "parentIcon": "AA"
      },
      "sideBar": [
        {
          "title": "aaa",
          "path": "/aaa",
          "icon": "AAA",
          "parentTitle": "aa",
          "parentIcon": "AA"
        },
        {
          "title": "aab",
          "path": "/aab",
          "icon": "AAB",
          "parentTitle": "aa",
          "parentIcon": "AA"
        }
      ],
      "endpoint": true,
      "backTo": {
        "title": "a",
        "path": "/a",
        "icon": "A"
      }
    }
  ];
  expect(result).toBe(getPrettyJson(expected));
  const currentPage = getCurrentPageConfig(pages, {
    pathname: "/aab"
  });
  const expectedCurrentPage = {
    "target": {
      "title": "aab",
      "path": "/aab",
      "icon": "AAB",
      "parentTitle": "aa",
      "parentIcon": "AA"
    },
    "sideBar": [
      {
        "title": "aaa",
        "path": "/aaa",
        "icon": "AAA",
        "parentTitle": "aa",
        "parentIcon": "AA"
      },
      {
        "title": "aab",
        "path": "/aab",
        "icon": "AAB",
        "parentTitle": "aa",
        "parentIcon": "AA"
      }
    ],
    "endpoint": true,
    "backTo": {
      "title": "a",
      "path": "/a",
      "icon": "A"
    }
  };
  expect(getPrettyJson(currentPage)).toBe(getPrettyJson(expectedCurrentPage));
});
