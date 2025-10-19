import {
  motion
} from "/build/_shared/chunk-DDLDRREX.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  createHotContext
} from "/build/_shared/chunk-YFCJW36L.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/components/BackgroundCircles.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/BackgroundCircles.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/BackgroundCircles.tsx"
  );
  import.meta.hot.lastModified = "1752737459434.6274";
}
function BackgroundCircles() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center justify-center", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, { animate: {
      scale: [1, 1.15, 1]
    }, transition: {
      repeat: Infinity,
      ease: "easeInOut",
      duration: 5,
      delay: 0.3
    }, className: "flex-0 absolute h-[1527px] w-[1527px] items-center justify-center rounded-full border-2 border-green-500" }, void 0, false, {
      fileName: "app/components/BackgroundCircles.tsx",
      lineNumber: 24,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, { animate: {
      scale: [1, 1.2, 1]
    }, transition: {
      repeat: Infinity,
      ease: "easeInOut",
      duration: 5,
      delay: 0.2
    }, className: "flex-0 absolute h-[1221px] w-[1221px] items-center justify-center rounded-full border-2 border-green-500" }, void 0, false, {
      fileName: "app/components/BackgroundCircles.tsx",
      lineNumber: 32,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, { animate: {
      scale: [1, 1.3, 1]
    }, transition: {
      repeat: Infinity,
      ease: "easeInOut",
      duration: 5,
      delay: 0.1
    }, className: "flex-0 absolute h-[917px] w-[917px] items-center justify-center rounded-full border-2 border-green-500" }, void 0, false, {
      fileName: "app/components/BackgroundCircles.tsx",
      lineNumber: 40,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, { animate: {
      scale: [1, 1.4, 1]
    }, transition: {
      repeat: Infinity,
      ease: "easeInOut",
      duration: 5
    }, className: "flex-0 absolute h-[611px] w-[611px] rounded-full border-2 border-green-500" }, void 0, false, {
      fileName: "app/components/BackgroundCircles.tsx",
      lineNumber: 48,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/BackgroundCircles.tsx",
    lineNumber: 23,
    columnNumber: 10
  }, this);
}
_c = BackgroundCircles;
var _c;
$RefreshReg$(_c, "BackgroundCircles");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

export {
  BackgroundCircles
};
//# sourceMappingURL=/build/_shared/chunk-KJH6JLKY.js.map
