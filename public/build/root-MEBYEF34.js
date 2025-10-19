import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "/build/_shared/chunk-4DQZW2TK.js";
import {
  createHotContext
} from "/build/_shared/chunk-YFCJW36L.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import "/build/_shared/chunk-BOXFZXVX.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/tailwind.css
var tailwind_default = "/build/_assets/tailwind-KQ5AWPPN.css";

// app/root.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/root.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/root.tsx"
  );
}
var meta = () => {
  return [{
    charset: "utf-8"
  }, {
    title: "insync - Stay in sync with the music you love"
  }, {
    name: "description",
    content: "insync automatically generates playlists with music from your favourite artists to help you rediscover the music you love!"
  }, {
    name: "viewport",
    content: "width=device-width,initial-scale=1"
  }, {
    property: "og:type",
    content: "website"
  }, {
    property: "og:url",
    content: "https://insync.vercel.app"
  }, {
    property: "og:title",
    content: "insync - Stay in sync with the music you love"
  }, {
    property: "og:description",
    content: "insync automatically generates playlists with music from your favourite artists to help you rediscover the music you love!"
  }, {
    property: "og:image",
    content: "https://i.imgur.com/69dTjNg.png"
  }, {
    name: "twitter:card",
    content: "summary_large_image"
  }, {
    name: "twitter:url",
    content: "https://insync.vercel.app"
  }, {
    name: "twitter:title",
    content: "insync - Stay in sync with the music you love"
  }, {
    name: "twitter:description",
    content: "insync automatically generates playlists with music from your favourite artists to help you rediscover the music you love!"
  }, {
    name: "twitter:image",
    content: "https://i.imgur.com/69dTjNg.png"
  }];
};
var links = () => {
  return [{
    rel: "stylesheet",
    href: tailwind_default
  }];
};
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("html", { lang: "en", className: "h-full font-sans", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 74,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 75,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 73,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("body", { className: "flex h-max flex-col bg-neutral-900 text-white", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 78,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", { className: "flex h-32 flex-col justify-between space-y-2 bg-[#0C0C0C] p-4 text-white sm:flex-row sm:space-y-0", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex h-full flex-col justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: `\xA9 ${(/* @__PURE__ */ new Date()).getFullYear()} insync` }, void 0, false, {
            fileName: "app/root.tsx",
            lineNumber: 81,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
            "Crafted by",
            " ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://twitter.com/bensilverman_", target: "_blank", rel: "noreferrer", className: "text-green-500 transition-colors hover:text-green-400", children: "Ben Silverman" }, void 0, false, {
              fileName: "app/root.tsx",
              lineNumber: 84,
              columnNumber: 8
            }, this),
            " ",
            "&",
            " ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "https://twitter.com/hieemeli", target: "_blank", rel: "noreferrer", className: "text-green-500 transition-colors hover:text-green-400", children: "Eemeli Ruohom\xE4ki" }, void 0, false, {
              fileName: "app/root.tsx",
              lineNumber: 88,
              columnNumber: 8
            }, this)
          ] }, void 0, true, {
            fileName: "app/root.tsx",
            lineNumber: 82,
            columnNumber: 7
          }, this)
        ] }, void 0, true, {
          fileName: "app/root.tsx",
          lineNumber: 80,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex space-x-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Data from" }, void 0, false, {
            fileName: "app/root.tsx",
            lineNumber: 94,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: "/images/Spotify_Logo_RGB_Green.png", alt: "Spotify logo", className: "h-6", height: 24 }, void 0, false, {
            fileName: "app/root.tsx",
            lineNumber: 95,
            columnNumber: 7
          }, this)
        ] }, void 0, true, {
          fileName: "app/root.tsx",
          lineNumber: 93,
          columnNumber: 6
        }, this)
      ] }, void 0, true, {
        fileName: "app/root.tsx",
        lineNumber: 79,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScrollRestoration, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 99,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 100,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LiveReload, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 101,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 77,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 72,
    columnNumber: 10
  }, this);
}
_c = App;
var _c;
$RefreshReg$(_c, "App");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  App as default,
  links,
  meta
};
//# sourceMappingURL=/build/root-MEBYEF34.js.map
