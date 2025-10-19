import {
  Item2,
  Label,
  Root2,
  TextInput
} from "/build/_shared/chunk-7JLMNPDR.js";
import {
  external_exports
} from "/build/_shared/chunk-UPVJMKO6.js";
import {
  x3 as x
} from "/build/_shared/chunk-ADKAJPYD.js";
import "/build/_shared/chunk-HZV34C65.js";
import "/build/_shared/chunk-MY4Q67QD.js";
import {
  AnimatePresence,
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
  Await,
  Form,
  useLoaderData,
  useNavigation,
  useSearchParams,
  useSubmit
} from "/build/_shared/chunk-4DQZW2TK.js";
import {
  createHotContext
} from "/build/_shared/chunk-YFCJW36L.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import {
  require_react
} from "/build/_shared/chunk-BOXFZXVX.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// empty-module:~/models/api.server
var require_api = __commonJS({
  "empty-module:~/models/api.server"(exports, module) {
    module.exports = {};
  }
});

// app/routes/__layout/studio.tsx
var import_node = __toESM(require_node());
var import_react4 = __toESM(require_react());

// app/components/ArtistChip.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/ArtistChip.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/ArtistChip.tsx"
  );
  import.meta.hot.lastModified = "1760782085716.5984";
}
function ArtistChip({
  image,
  text,
  onClick,
  selected
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { onClick, className: `flex h-8 w-max items-center gap-x-2 rounded-full border bg-neutral-800 py-1 pl-1 pr-2 transition-colors hover:cursor-pointer hover:bg-neutral-700
			${selected ? "border-green-600 hover:border-green-500" : "border-neutral-600 hover:border-neutral-500"}
			`, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: image, alt: `${text} icon`, width: 20, height: 20, className: "rounded-full" }, void 0, false, {
      fileName: "app/components/ArtistChip.tsx",
      lineNumber: 32,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: `text-sm transition-colors  ${selected ? "text-white" : "text-neutral-400"}`, children: text }, void 0, false, {
      fileName: "app/components/ArtistChip.tsx",
      lineNumber: 33,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/ArtistChip.tsx",
    lineNumber: 29,
    columnNumber: 10
  }, this);
}
_c = ArtistChip;
function ArtistChip2({
  image,
  text,
  onClick,
  selected
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { onClick, className: "flex select-none flex-col items-center gap-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: image, alt: `${text} profile`, width: 56, height: 56, className: "h-14 w-14 cursor-pointer rounded-full object-cover" }, void 0, false, {
        fileName: "app/components/ArtistChip.tsx",
        lineNumber: 47,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AnimatePresence, { children: selected && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, { initial: {
        scale: 0
      }, animate: {
        scale: 1
      }, exit: {
        scale: 0
      }, transition: {
        duration: 0.1
      }, className: "absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(x, { color: "#1d1d1d", width: 18, height: 18, strokeWidth: 2 }, void 0, false, {
        fileName: "app/components/ArtistChip.tsx",
        lineNumber: 58,
        columnNumber: 8
      }, this) }, void 0, false, {
        fileName: "app/components/ArtistChip.tsx",
        lineNumber: 49,
        columnNumber: 19
      }, this) }, void 0, false, {
        fileName: "app/components/ArtistChip.tsx",
        lineNumber: 48,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/ArtistChip.tsx",
      lineNumber: 46,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-center text-xs text-white", children: text }, void 0, false, {
      fileName: "app/components/ArtistChip.tsx",
      lineNumber: 62,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/ArtistChip.tsx",
    lineNumber: 45,
    columnNumber: 10
  }, this);
}
_c2 = ArtistChip2;
var _c;
var _c2;
$RefreshReg$(_c, "ArtistChip");
$RefreshReg$(_c2, "ArtistChip2");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/NumberInput.tsx
var import_react = __toESM(require_react());
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/NumberInput.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/NumberInput.tsx"
  );
  import.meta.hot.lastModified = "1752737459434.749";
}
var NumberInput = _s((0, import_react.forwardRef)(_c3 = _s(({
  className,
  ...rest
}, ref) => {
  _s();
  const [value, setValue] = (0, import_react.useState)(rest.defaultValue ?? 50);
  const max = rest.max ?? 100;
  const min = rest.min ?? 0;
  const increment = () => {
    setValue((prev) => Math.min(max, (prev || 0) + 1));
  };
  const decrement = () => {
    setValue((prev) => Math.max(min, (prev || 0) - 1));
  };
  const handleChange = (event) => {
    const newValue = event.target.value;
    if (newValue === "") {
      setValue("");
    }
    if (!/[0-9]+/.test(newValue))
      return;
    const parsedValue = parseInt(newValue);
    return setValue(parsedValue);
  };
  const handleBlur = () => {
    if (value === "" || 0) {
      return setValue(1);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("div", { className: "flex flex-nowrap", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { onClick: decrement, type: "button", className: "rounded-tl-full rounded-bl-full bg-neutral-700 py-1 pl-4 pr-3 transition-colors hover:bg-neutral-600", children: "-" }, void 0, false, {
      fileName: "app/components/NumberInput.tsx",
      lineNumber: 52,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("input", { ref, type: "tel", value, min: 0, max: 100, onBlur: handleBlur, onChange: handleChange, className: `w-12 min-w-0 border-neutral-500 bg-neutral-800 px-2 py-1 text-center transition-colors focus:bg-neutral-600 ${className}`, ...rest }, void 0, false, {
      fileName: "app/components/NumberInput.tsx",
      lineNumber: 55,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)("button", { onClick: increment, type: "button", className: "rounded-tr-full rounded-br-full bg-neutral-700 py-1 pl-3 pr-4 transition-colors hover:bg-neutral-600", children: "+" }, void 0, false, {
      fileName: "app/components/NumberInput.tsx",
      lineNumber: 56,
      columnNumber: 5
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/NumberInput.tsx",
    lineNumber: 51,
    columnNumber: 10
  }, this);
}, "Xtj4WOF8ldg5s2HX9qQgK4ww5lQ=")), "Xtj4WOF8ldg5s2HX9qQgK4ww5lQ=");
_c22 = NumberInput;
NumberInput.displayName = "NumberInput";
var _c3;
var _c22;
$RefreshReg$(_c3, "NumberInput$forwardRef");
$RefreshReg$(_c22, "NumberInput");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/Range.tsx
var import_react2 = __toESM(require_react());
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/Range.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/Range.tsx"
  );
  import.meta.hot.lastModified = "1752737459434.925";
}
var RangeSlider = (0, import_react2.forwardRef)(_c4 = ({
  className,
  ...rest
}, ref) => {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("input", { ref, type: "range", className: `min-w-0 touch-none accent-green-500 ${className}`, defaultValue: 50, min: 0, max: 100, ...rest }, void 0, false, {
    fileName: "app/components/Range.tsx",
    lineNumber: 26,
    columnNumber: 10
  }, this);
});
_c23 = RangeSlider;
RangeSlider.displayName = "RangeSlider";
var _c4;
var _c23;
$RefreshReg$(_c4, "RangeSlider$forwardRef");
$RefreshReg$(_c23, "RangeSlider");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/RangeGroup.tsx
var import_jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/RangeGroup.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/RangeGroup.tsx"
  );
  import.meta.hot.lastModified = "1752737459434.9917";
}
function RangeGroup({
  label,
  leftText,
  rightText,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "w-full", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)(Label, { children: label }, void 0, false, {
      fileName: "app/components/RangeGroup.tsx",
      lineNumber: 29,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { children: [
      children,
      /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { className: "text-xs text-neutral-400", children: leftText }, void 0, false, {
          fileName: "app/components/RangeGroup.tsx",
          lineNumber: 33,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime4.jsxDEV)("span", { className: "text-xs text-neutral-400", children: rightText }, void 0, false, {
          fileName: "app/components/RangeGroup.tsx",
          lineNumber: 34,
          columnNumber: 6
        }, this)
      ] }, void 0, true, {
        fileName: "app/components/RangeGroup.tsx",
        lineNumber: 32,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/components/RangeGroup.tsx",
      lineNumber: 30,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/RangeGroup.tsx",
    lineNumber: 28,
    columnNumber: 10
  }, this);
}
_c5 = RangeGroup;
var _c5;
$RefreshReg$(_c5, "RangeGroup");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/components/Spinner.tsx
var import_jsx_dev_runtime5 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/components/Spinner.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/components/Spinner.tsx"
  );
  import.meta.hot.lastModified = "1752737459435.0518";
}
function Spinner() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)(motion.svg, { fill: "#ffffff", width: "32px", height: "32px", viewBox: "0 0 32 32", version: "1.1", xmlns: "http://www.w3.org/2000/svg", animate: {
    rotate: 360
  }, transition: {
    repeat: Infinity,
    bounce: 0,
    ease: "linear",
    duration: 0.75
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("title", { children: "spinner-one-third" }, void 0, false, {
      fileName: "app/components/Spinner.tsx",
      lineNumber: 31,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime5.jsxDEV)("path", { d: "M16 0.75c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0c7.042 0.001 12.75 5.71 12.75 12.751 0 3.521-1.427 6.709-3.734 9.016v0c-0.226 0.226-0.365 0.538-0.365 0.883 0 0.69 0.56 1.25 1.25 1.25 0.346 0 0.659-0.14 0.885-0.367l0-0c2.759-2.76 4.465-6.572 4.465-10.782 0-8.423-6.828-15.251-15.25-15.251h-0z" }, void 0, false, {
      fileName: "app/components/Spinner.tsx",
      lineNumber: 32,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/components/Spinner.tsx",
    lineNumber: 23,
    columnNumber: 10
  }, this);
}
_c6 = Spinner;
var _c6;
$RefreshReg$(_c6, "Spinner");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/routes/__layout/studio.tsx
var import_api = __toESM(require_api());
var import_jsx_dev_runtime6 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/__layout/studio.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
var _s22 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/__layout/studio.tsx"
  );
  import.meta.hot.lastModified = "1760869852858.8547";
}
var generateOptionsSchema = external_exports.object({
  trackCount: external_exports.coerce.number().min(1).max(100).catch(20),
  name: external_exports.string().min(1).catch("Insync Studio Mixtape"),
  tempo: external_exports.number().min(30).max(300).catch(100),
  popularity: external_exports.number().min(0).max(100).catch(80),
  energy: external_exports.number().min(0).max(1).catch(0.5)
});
var seedArtistSchema = external_exports.array(external_exports.string()).catch([]);
function StudioPage() {
  _s2();
  const {
    artistDataPromise
  } = useLoaderData();
  const [searchParams] = useSearchParams();
  const navigation = useNavigation();
  const [selectedArtists, setSelectedArtists] = (0, import_react4.useState)([]);
  const [searchTerm, setSearchTerm] = (0, import_react4.useState)("");
  const includeTop = searchParams.get("includeTop") === "true";
  const isGenerating = navigation.state === "submitting" && navigation.formMethod === "post";
  const generateButtonText = isGenerating ? "Generating..." : "Generate";
  const isLoading = navigation.state === "loading" && navigation.formMethod === "get";
  const handleChipClick = ({
    name,
    id
  }) => {
    const hasArtist = selectedArtists.find((artist) => artist.id === id);
    if (hasArtist) {
      return setSelectedArtists((prev) => prev.filter((artist) => artist.id !== id));
    }
    if (selectedArtists.length === 5)
      return;
    return setSelectedArtists((prev) => [...prev, {
      name,
      id
    }]);
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex h-full w-full flex-col items-center gap-y-8 px-2 sm:px-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex h-max w-full max-w-4xl flex-col gap-y-8 gap-x-0 sm:flex-row sm:gap-y-0 sm:gap-x-4", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex w-full flex-col sm:w-1/2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h2", { className: "mb-4 text-xl text-neutral-300 sm:hidden", children: "Select artists" }, void 0, false, {
        fileName: "app/routes/__layout/studio.tsx",
        lineNumber: 189,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "h-full w-full  rounded-xl border border-neutral-700", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex flex-col gap-4 px-4 pt-4 pb-4", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex justify-between text-sm text-neutral-400", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { children: "Artists" }, void 0, false, {
              fileName: "app/routes/__layout/studio.tsx",
              lineNumber: 195,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: `${selectedArtists.length == 5 ? "text-green-500" : ""}`, children: [
              selectedArtists.length,
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("span", { className: "text-neutral-400", children: "/5" }, void 0, false, {
                fileName: "app/routes/__layout/studio.tsx",
                lineNumber: 198,
                columnNumber: 10
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/__layout/studio.tsx",
              lineNumber: 196,
              columnNumber: 9
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/__layout/studio.tsx",
            lineNumber: 194,
            columnNumber: 8
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(TextInput, { placeholder: "Search", value: searchTerm, onChange: (event) => setSearchTerm(event.target.value), className: "z-10 w-full" }, void 0, false, {
            fileName: "app/routes/__layout/studio.tsx",
            lineNumber: 201,
            columnNumber: 8
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex items-center", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Form, { method: "get", className: "z-10", replace: true, preventScrollReset: true, children: [
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("input", { type: "hidden", name: "includeTop", value: String(!includeTop) }, void 0, false, {
                fileName: "app/routes/__layout/studio.tsx",
                lineNumber: 204,
                columnNumber: 10
              }, this),
              !includeTop && /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("input", { type: "hidden", name: "range", value: "short" }, void 0, false, {
                fileName: "app/routes/__layout/studio.tsx",
                lineNumber: 205,
                columnNumber: 26
              }, this),
              /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("button", { type: "submit", className: `whitespace-nowrap rounded-full border py-1 px-3 transition-colors hover:cursor-pointer sm:text-sm ${includeTop ? "border-green-600 bg-green-900 text-green-200 hover:border-green-500 hover:bg-green-800" : "border-neutral-600 bg-neutral-800 text-neutral-400 hover:border-neutral-500 hover:bg-neutral-700"}`, children: "Top artists" }, void 0, false, {
                fileName: "app/routes/__layout/studio.tsx",
                lineNumber: 206,
                columnNumber: 10
              }, this)
            ] }, void 0, true, {
              fileName: "app/routes/__layout/studio.tsx",
              lineNumber: 203,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(AnimatePresence, { initial: false, children: includeTop && /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(motion.div, { className: "-ml-4 overflow-x-scroll md:overflow-x-auto", initial: {
              opacity: 0,
              x: -10
            }, animate: {
              opacity: 1,
              x: 0
            }, exit: {
              opacity: 0,
              x: -10
            }, transition: {
              bounce: false,
              duration: 0.15
            }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(TimeRangeFilter, { includesTop: includeTop }, void 0, false, {
              fileName: "app/routes/__layout/studio.tsx",
              lineNumber: 224,
              columnNumber: 12
            }, this) }, void 0, false, {
              fileName: "app/routes/__layout/studio.tsx",
              lineNumber: 211,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "app/routes/__layout/studio.tsx",
              lineNumber: 210,
              columnNumber: 9
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/__layout/studio.tsx",
            lineNumber: 202,
            columnNumber: 8
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/__layout/studio.tsx",
          lineNumber: 193,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "relative w-full transition duration-300 sm:max-h-96", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(import_react4.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex h-full w-full items-center justify-center gap-x-4 p-4", children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { children: "Loading artists..." }, void 0, false, {
              fileName: "app/routes/__layout/studio.tsx",
              lineNumber: 232,
              columnNumber: 11
            }, this),
            " ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Spinner, {}, void 0, false, {
              fileName: "app/routes/__layout/studio.tsx",
              lineNumber: 232,
              columnNumber: 37
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/__layout/studio.tsx",
            lineNumber: 231,
            columnNumber: 28
          }, this), children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Await, { resolve: artistDataPromise, errorElement: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "p-4", children: "Error loading artists..." }, void 0, false, {
            fileName: "app/routes/__layout/studio.tsx",
            lineNumber: 234,
            columnNumber: 58
          }, this), children: (artists) => {
            if (artists.length === 0) {
              return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex h-full w-full flex-col items-center justify-center overflow-y-scroll", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("p", { className: "text-sm text-neutral-400", children: "You need to be following at least one artist!" }, void 0, false, {
                fileName: "app/routes/__layout/studio.tsx",
                lineNumber: 238,
                columnNumber: 14
              }, this) }, void 0, false, {
                fileName: "app/routes/__layout/studio.tsx",
                lineNumber: 237,
                columnNumber: 28
              }, this);
            }
            const filteredArtists = artists.filter(({
              name
            }) => name.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => b.popularity - a.popularity);
            return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(motion.div, { initial: {
              opacity: 0
            }, animate: {
              opacity: 1
            }, className: "grid h-[350px] grid-cols-4 gap-x-2 gap-y-4 overflow-y-scroll p-4 pt-2 sm:grid-cols-5", children: filteredArtists.map(({
              name,
              images,
              id
            }) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(ArtistChip2, { image: images[images.length - 1].url ?? "", text: name, onClick: () => handleChipClick({
              name,
              id
            }), selected: Boolean(selectedArtists.find((artist) => artist.id === id)) }, id, false, {
              fileName: "app/routes/__layout/studio.tsx",
              lineNumber: 255,
              columnNumber: 27
            }, this)) }, void 0, false, {
              fileName: "app/routes/__layout/studio.tsx",
              lineNumber: 246,
              columnNumber: 26
            }, this);
          } }, void 0, false, {
            fileName: "app/routes/__layout/studio.tsx",
            lineNumber: 234,
            columnNumber: 9
          }, this) }, void 0, false, {
            fileName: "app/routes/__layout/studio.tsx",
            lineNumber: 231,
            columnNumber: 8
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(AnimatePresence, { children: isLoading && /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(motion.div, { initial: {
            opacity: 0
          }, animate: {
            opacity: 1
          }, exit: {
            opacity: 0
          }, transition: {
            delay: 0.2,
            duration: 0.25
          }, className: "absolute top-0 left-0 flex h-full w-full touch-none items-center justify-center bg-neutral-900/80", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Spinner, {}, void 0, false, {
            fileName: "app/routes/__layout/studio.tsx",
            lineNumber: 274,
            columnNumber: 11
          }, this) }, void 0, false, {
            fileName: "app/routes/__layout/studio.tsx",
            lineNumber: 264,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/__layout/studio.tsx",
            lineNumber: 263,
            columnNumber: 8
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/__layout/studio.tsx",
          lineNumber: 230,
          columnNumber: 7
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/__layout/studio.tsx",
        lineNumber: 192,
        columnNumber: 6
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/__layout/studio.tsx",
      lineNumber: 188,
      columnNumber: 5
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "h-max w-full sm:w-1/2", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("h2", { className: "mb-4 text-xl text-neutral-300 sm:hidden", children: "Generate playlist" }, void 0, false, {
        fileName: "app/routes/__layout/studio.tsx",
        lineNumber: 281,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Form, { method: "post", className: "flex flex-col items-center gap-y-4 rounded-xl border border-neutral-700 p-4 shadow", children: [
        selectedArtists.map((artist) => /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("input", { type: "hidden", name: "selected_artist", value: JSON.stringify(artist) }, artist.id, false, {
          fileName: "app/routes/__layout/studio.tsx",
          lineNumber: 285,
          columnNumber: 38
        }, this)),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "w-full", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Label, { htmlFor: "name", children: "Playlist Name" }, void 0, false, {
            fileName: "app/routes/__layout/studio.tsx",
            lineNumber: 287,
            columnNumber: 8
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(TextInput, { id: "name", name: "name", placeholder: "insync mixtape", className: "mt-1 w-full" }, void 0, false, {
            fileName: "app/routes/__layout/studio.tsx",
            lineNumber: 288,
            columnNumber: 8
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/__layout/studio.tsx",
          lineNumber: 286,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("div", { className: "flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Label, { children: "How many tracks? (max. 100)" }, void 0, false, {
            fileName: "app/routes/__layout/studio.tsx",
            lineNumber: 291,
            columnNumber: 8
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(NumberInput, { className: "hide-spinner w-12", name: "track_count", min: 1, max: 100 }, void 0, false, {
            fileName: "app/routes/__layout/studio.tsx",
            lineNumber: 292,
            columnNumber: 8
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/__layout/studio.tsx",
          lineNumber: 290,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(RangeGroup, { label: "Tempo (BPM)", leftText: "30", rightText: "300", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(RangeSlider, { name: "tempo", id: "tempo", min: 30, max: 300, className: "w-full" }, void 0, false, {
          fileName: "app/routes/__layout/studio.tsx",
          lineNumber: 295,
          columnNumber: 8
        }, this) }, void 0, false, {
          fileName: "app/routes/__layout/studio.tsx",
          lineNumber: 294,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(RangeGroup, { label: "Popularity", leftText: "Obscure finds", rightText: "Chart toppers", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(RangeSlider, { name: "popularity", id: "popularity", min: 0, max: 100, step: 1, className: "w-full" }, void 0, false, {
          fileName: "app/routes/__layout/studio.tsx",
          lineNumber: 298,
          columnNumber: 8
        }, this) }, void 0, false, {
          fileName: "app/routes/__layout/studio.tsx",
          lineNumber: 297,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(RangeGroup, { label: "Energy", leftText: "Chilling out", rightText: "Ramping up", children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(RangeSlider, { name: "energy", id: "energy", min: 0, max: 1, step: 0.01, className: "w-full" }, void 0, false, {
          fileName: "app/routes/__layout/studio.tsx",
          lineNumber: 301,
          columnNumber: 8
        }, this) }, void 0, false, {
          fileName: "app/routes/__layout/studio.tsx",
          lineNumber: 300,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("button", { type: "submit", disabled: selectedArtists.length === 0 || isGenerating, className: "rounded-full bg-green-500 px-4 py-2 text-sm font-bold uppercase text-neutral-900 transition-all hover:bg-green-400 disabled:opacity-50", children: generateButtonText }, void 0, false, {
          fileName: "app/routes/__layout/studio.tsx",
          lineNumber: 303,
          columnNumber: 7
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/__layout/studio.tsx",
        lineNumber: 284,
        columnNumber: 6
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/__layout/studio.tsx",
      lineNumber: 280,
      columnNumber: 5
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/__layout/studio.tsx",
    lineNumber: 187,
    columnNumber: 4
  }, this) }, void 0, false, {
    fileName: "app/routes/__layout/studio.tsx",
    lineNumber: 186,
    columnNumber: 10
  }, this);
}
_s2(StudioPage, "PydYuKx8gmSwHTG4ATrSI02IY3Y=", false, function() {
  return [useLoaderData, useSearchParams, useNavigation];
});
_c7 = StudioPage;
function TimeRangeFilter({
  includesTop
}) {
  _s22();
  const submit = useSubmit();
  const handleChange = (event) => {
    submit(event.currentTarget, {
      replace: true,
      preventScrollReset: true
    });
  };
  const itemClassName = "rounded-full py-1 px-3 transition-colors hover:border-neutral-600 hover:bg-neutral-600 data-[state=checked]:border-neutral-600 data-[state=checked]:bg-neutral-700";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Form, { method: "get", onChange: handleChange, className: "z-0 overflow-x-scroll rounded-br-full rounded-tr-full  border border-neutral-700 bg-neutral-800 pl-5 text-neutral-400 sm:text-sm md:overflow-x-auto", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("input", { type: "hidden", name: "includeTop", value: String(includesTop) }, void 0, false, {
      fileName: "app/routes/__layout/studio.tsx",
      lineNumber: 328,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Root2, { defaultValue: "medium", id: "range", name: "range", "aria-label": "Time range", orientation: "horizontal", loop: false, className: "flex justify-between gap-x-1", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Item2, { value: "short", id: "r1", className: itemClassName, children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("label", { htmlFor: "r1", className: "cursor-pointer whitespace-nowrap", children: "4 weeks" }, void 0, false, {
        fileName: "app/routes/__layout/studio.tsx",
        lineNumber: 331,
        columnNumber: 6
      }, this) }, void 0, false, {
        fileName: "app/routes/__layout/studio.tsx",
        lineNumber: 330,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Item2, { value: "medium", id: "r2", className: itemClassName, children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("label", { htmlFor: "r2", className: "cursor-pointer whitespace-nowrap", children: "6 months" }, void 0, false, {
        fileName: "app/routes/__layout/studio.tsx",
        lineNumber: 336,
        columnNumber: 6
      }, this) }, void 0, false, {
        fileName: "app/routes/__layout/studio.tsx",
        lineNumber: 335,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)(Item2, { value: "long", id: "r3", className: itemClassName, children: /* @__PURE__ */ (0, import_jsx_dev_runtime6.jsxDEV)("label", { htmlFor: "r3", className: "cursor-pointer whitespace-nowrap", children: "All time" }, void 0, false, {
        fileName: "app/routes/__layout/studio.tsx",
        lineNumber: 341,
        columnNumber: 6
      }, this) }, void 0, false, {
        fileName: "app/routes/__layout/studio.tsx",
        lineNumber: 340,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/__layout/studio.tsx",
      lineNumber: 329,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/__layout/studio.tsx",
    lineNumber: 327,
    columnNumber: 10
  }, this);
}
_s22(TimeRangeFilter, "/qFIYzOq2OE/SSM69ffcyD0/sOE=", false, function() {
  return [useSubmit];
});
_c24 = TimeRangeFilter;
var _c7;
var _c24;
$RefreshReg$(_c7, "StudioPage");
$RefreshReg$(_c24, "TimeRangeFilter");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  StudioPage as default
};
//# sourceMappingURL=/build/routes/__layout/studio-INISZCVD.js.map
