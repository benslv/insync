import {
  OnboardingModal
} from "/build/_shared/chunk-SO7F67N2.js";
import {
  L2 as L
} from "/build/_shared/chunk-ADKAJPYD.js";
import "/build/_shared/chunk-HZV34C65.js";
import "/build/_shared/chunk-DDLDRREX.js";
import "/build/_shared/chunk-NMZL6IDN.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  Link,
  Outlet,
  useMatches
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

// app/routes/__layout.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/__layout.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/__layout.tsx"
  );
  import.meta.hot.lastModified = "1760870708470.3323";
}
function GenerateIndex() {
  _s();
  const matches = useMatches();
  const selectedRoute = matches[2].pathname;
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative flex flex-col items-center justify-between w-full h-full min-h-screen py-8 gap-y-8", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-neutral-400", children: "Choose generation method:" }, void 0, false, {
          fileName: "app/routes/__layout.tsx",
          lineNumber: 32,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex p-1 border rounded-lg w-max gap-x-1 border-neutral-600 bg-neutral-900", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "./basic", replace: true, className: `rounded-md border px-2 py-1 align-baseline transition-colors hover:bg-neutral-800 ${selectedRoute === "/basic" ? "border-neutral-500 bg-neutral-700" : "border-neutral-900"}`, children: "Basic" }, void 0, false, {
            fileName: "app/routes/__layout.tsx",
            lineNumber: 34,
            columnNumber: 7
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "./studio", replace: true, className: `rounded-md border px-2 py-1 align-baseline transition-colors hover:bg-neutral-800 ${selectedRoute === "/studio" ? "border-neutral-500 bg-neutral-700" : "border-neutral-900"}`, children: "Studio" }, void 0, false, {
            fileName: "app/routes/__layout.tsx",
            lineNumber: 37,
            columnNumber: 7
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/__layout.tsx",
          lineNumber: 33,
          columnNumber: 6
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/__layout.tsx",
        lineNumber: 31,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(OnboardingModal, {}, void 0, false, {
        fileName: "app/routes/__layout.tsx",
        lineNumber: 42,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/__layout.tsx",
      lineNumber: 30,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Outlet, {}, void 0, false, {
      fileName: "app/routes/__layout.tsx",
      lineNumber: 45,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/", className: "flex transition-all duration-150 h-max w-max text-neutral-500 hover:text-neutral-200", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(L, {}, void 0, false, {
        fileName: "app/routes/__layout.tsx",
        lineNumber: 48,
        columnNumber: 5
      }, this),
      "Go back"
    ] }, void 0, true, {
      fileName: "app/routes/__layout.tsx",
      lineNumber: 47,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/__layout.tsx",
    lineNumber: 29,
    columnNumber: 10
  }, this);
}
_s(GenerateIndex, "9HQn1rkLPttBP+QSK6GDQicXTV4=", false, function() {
  return [useMatches];
});
_c = GenerateIndex;
var _c;
$RefreshReg$(_c, "GenerateIndex");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  GenerateIndex as default
};
//# sourceMappingURL=/build/routes/__layout-RVG6UZWF.js.map
