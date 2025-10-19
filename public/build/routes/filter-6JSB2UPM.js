import {
  external_exports
} from "/build/_shared/chunk-UPVJMKO6.js";
import {
  require_node
} from "/build/_shared/chunk-G7CHZRZX.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XU7DNSPJ.js";
import {
  Form,
  useLoaderData,
  useSubmit
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

// app/routes/filter.tsx
var import_node = __toESM(require_node());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/filter.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/filter.tsx"
  );
  import.meta.hot.lastModified = "1760869845361.913";
}
var sourceSchema = external_exports.union([external_exports.literal("followed"), external_exports.literal("top")]).catch("followed");
function Page() {
  _s();
  const {
    source
  } = useLoaderData();
  const submit = useSubmit();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "get", onChange: (e) => submit(e.currentTarget), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("fieldset", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "source", defaultChecked: source !== "top", value: "followed" }, void 0, false, {
          fileName: "app/routes/filter.tsx",
          lineNumber: 45,
          columnNumber: 7
        }, this),
        " ",
        "Followed"
      ] }, void 0, true, {
        fileName: "app/routes/filter.tsx",
        lineNumber: 44,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "radio", name: "source", defaultChecked: source === "top", value: "top" }, void 0, false, {
          fileName: "app/routes/filter.tsx",
          lineNumber: 49,
          columnNumber: 7
        }, this),
        " ",
        "Top"
      ] }, void 0, true, {
        fileName: "app/routes/filter.tsx",
        lineNumber: 48,
        columnNumber: 6
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/filter.tsx",
      lineNumber: 43,
      columnNumber: 5
    }, this) }, void 0, false, {
      fileName: "app/routes/filter.tsx",
      lineNumber: 42,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: source }, void 0, false, {
      fileName: "app/routes/filter.tsx",
      lineNumber: 54,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/filter.tsx",
    lineNumber: 41,
    columnNumber: 10
  }, this);
}
_s(Page, "LPWxCB3gbac6VvXj57dl0DRb+zc=", false, function() {
  return [useLoaderData, useSubmit];
});
_c = Page;
var _c;
$RefreshReg$(_c, "Page");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Page as default
};
//# sourceMappingURL=/build/routes/filter-6JSB2UPM.js.map
