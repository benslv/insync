import {
  OnboardingModal
} from "/build/_shared/chunk-SO7F67N2.js";
import {
  BackgroundCircles
} from "/build/_shared/chunk-KJH6JLKY.js";
import "/build/_shared/chunk-ADKAJPYD.js";
import "/build/_shared/chunk-HZV34C65.js";
import "/build/_shared/chunk-MY4Q67QD.js";
import {
  motion
} from "/build/_shared/chunk-DDLDRREX.js";
import "/build/_shared/chunk-NMZL6IDN.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  Form,
  Link,
  useLoaderData
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

// app/routes/index.tsx
var import_node = __toESM(require_node());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/index.tsx"
  );
  import.meta.hot.lastModified = "1760871977517.0227";
}
function Index() {
  _s();
  const {
    userProfile,
    oAuthUrl
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-screen overflow-hidden", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative z-10 flex h-full max-h-full", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex h-full w-full flex-col items-center justify-center gap-y-4 border-r border-white/20 px-8 text-center drop-shadow-xl sm:max-w-xl sm:items-start sm:text-left md:px-16", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex w-full flex-col items-center gap-y-4 sm:items-start", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "w-full text-5xl tracking-tighter", children: "Stay in sync with the music you love" }, void 0, false, {
            fileName: "app/routes/index.tsx",
            lineNumber: 104,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "w-full", children: "insync creates playlists from your followed artists on Spotify. Connect your account for personalised music discovery." }, void 0, false, {
            fileName: "app/routes/index.tsx",
            lineNumber: 107,
            columnNumber: 7
          }, this),
          oAuthUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: oAuthUrl, className: "w-max rounded-full bg-green-500 px-4 py-2 text-sm font-bold uppercase text-neutral-900 transition-colors hover:bg-green-400", children: "Connect to Spotify" }, void 0, false, {
            fileName: "app/routes/index.tsx",
            lineNumber: 111,
            columnNumber: 19
          }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex h-16 w-full gap-x-2", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "./basic", className: "flex h-full w-full items-center justify-center rounded-2xl border border-neutral-700 bg-neutral-900 transition duration-300 hover:border-neutral-500", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-xl", children: "Basic" }, void 0, false, {
              fileName: "app/routes/index.tsx",
              lineNumber: 115,
              columnNumber: 10
            }, this) }, void 0, false, {
              fileName: "app/routes/index.tsx",
              lineNumber: 114,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "./studio", className: "group relative h-full w-full rounded-2xl bg-gradient-to-br from-white/10 via-white/75 to-white/10", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0.5 flex items-center  justify-center overflow-hidden rounded-[14px] bg-gradient-to-br from-black via-[#222] to-black shadow-tile ring-white/20 transition-all duration-300 hover:ring-[2px]", children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-2xl font-semibold tracking-tighter", children: "Studio" }, void 0, false, {
                fileName: "app/routes/index.tsx",
                lineNumber: 119,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "absolute inset-0 h-full w-full bg-gradient-to-t from-green-500 to-transparent opacity-10 transition-all duration-300 group-hover:opacity-20" }, void 0, false, {
                fileName: "app/routes/index.tsx",
                lineNumber: 122,
                columnNumber: 11
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/index.tsx",
              lineNumber: 118,
              columnNumber: 10
            }, this) }, void 0, false, {
              fileName: "app/routes/index.tsx",
              lineNumber: 117,
              columnNumber: 9
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/index.tsx",
            lineNumber: 113,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(OnboardingModal, {}, void 0, false, {
            fileName: "app/routes/index.tsx",
            lineNumber: 126,
            columnNumber: 7
          }, this),
          " "
        ] }, void 0, true, {
          fileName: "app/routes/index.tsx",
          lineNumber: 103,
          columnNumber: 6
        }, this),
        userProfile ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex w-full flex-col gap-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("hr", { className: "border-neutral-600" }, void 0, false, {
            fileName: "app/routes/index.tsx",
            lineNumber: 130,
            columnNumber: 8
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col items-center gap-x-2 sm:flex-row sm:justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-x-2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm", children: [
              "Logged in as ",
              userProfile.display_name
            ] }, void 0, true, {
              fileName: "app/routes/index.tsx",
              lineNumber: 134,
              columnNumber: 10
            }, this) }, void 0, false, {
              fileName: "app/routes/index.tsx",
              lineNumber: 132,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", action: "/logout", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", value: "logout", className: "text-sm underline", children: "Logout" }, void 0, false, {
              fileName: "app/routes/index.tsx",
              lineNumber: 139,
              columnNumber: 10
            }, this) }, void 0, false, {
              fileName: "app/routes/index.tsx",
              lineNumber: 138,
              columnNumber: 9
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/index.tsx",
            lineNumber: 131,
            columnNumber: 8
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/index.tsx",
          lineNumber: 129,
          columnNumber: 21
        }, this) : null
      ] }, void 0, true, {
        fileName: "app/routes/index.tsx",
        lineNumber: 102,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative hidden h-full w-full items-center overflow-hidden sm:flex sm:justify-end", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BackgroundCircles, {}, void 0, false, {
        fileName: "app/routes/index.tsx",
        lineNumber: 147,
        columnNumber: 6
      }, this) }, void 0, false, {
        fileName: "app/routes/index.tsx",
        lineNumber: 146,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/index.tsx",
      lineNumber: 101,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, transition: {
      delay: 0.5,
      duration: 2
    }, className: "relative z-0 flex blur-md sm:hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BackgroundCircles, {}, void 0, false, {
      fileName: "app/routes/index.tsx",
      lineNumber: 158,
      columnNumber: 5
    }, this) }, void 0, false, {
      fileName: "app/routes/index.tsx",
      lineNumber: 150,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/index.tsx",
    lineNumber: 100,
    columnNumber: 10
  }, this);
}
_s(Index, "HEhtDiZ8fg/EYjvOAKBEQHCuZX8=", false, function() {
  return [useLoaderData];
});
_c = Index;
function ErrorBoundary() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex h-full max-h-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "z-10 flex h-full w-full flex-col items-center justify-center gap-y-4 border-r border-white/20 px-8 text-center drop-shadow-xl sm:max-w-xl sm:items-start sm:text-left md:px-16", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "w-full", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "mb-2 text-3xl tracking-tighter sm:text-5xl", children: "Whoops!" }, void 0, false, {
          fileName: "app/routes/index.tsx",
          lineNumber: 170,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "mb-2", children: "insync ran into an error." }, void 0, false, {
          fileName: "app/routes/index.tsx",
          lineNumber: 173,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Click the button below to be taken back to the homepage, and we'll try again." }, void 0, false, {
          fileName: "app/routes/index.tsx",
          lineNumber: 174,
          columnNumber: 6
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/index.tsx",
        lineNumber: 169,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", action: "/logout", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "w-max rounded-full bg-green-500 px-4 py-2 text-sm font-bold uppercase text-neutral-900 transition-colors hover:bg-green-400", children: "Home" }, void 0, false, {
        fileName: "app/routes/index.tsx",
        lineNumber: 180,
        columnNumber: 6
      }, this) }, void 0, false, {
        fileName: "app/routes/index.tsx",
        lineNumber: 179,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/index.tsx",
      lineNumber: 168,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, transition: {
      delay: 0.5,
      duration: 2
    }, className: "relative z-0 flex blur-md sm:hidden", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BackgroundCircles, {}, void 0, false, {
      fileName: "app/routes/index.tsx",
      lineNumber: 193,
      columnNumber: 5
    }, this) }, void 0, false, {
      fileName: "app/routes/index.tsx",
      lineNumber: 185,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/index.tsx",
    lineNumber: 167,
    columnNumber: 10
  }, this);
}
_c2 = ErrorBoundary;
var _c;
var _c2;
$RefreshReg$(_c, "Index");
$RefreshReg$(_c2, "ErrorBoundary");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ErrorBoundary,
  Index as default
};
//# sourceMappingURL=/build/routes/index-Y6UNRK3K.js.map
