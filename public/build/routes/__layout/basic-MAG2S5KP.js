import {
  Item2,
  Label,
  Root2,
  TextInput
} from "/build/_shared/chunk-7JLMNPDR.js";
import "/build/_shared/chunk-UPVJMKO6.js";
import "/build/_shared/chunk-HZV34C65.js";
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
  useActionData,
  useNavigation
} from "/build/_shared/chunk-4DQZW2TK.js";
import {
  createHotContext
} from "/build/_shared/chunk-YFCJW36L.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-GIAAE3CH.js";
import "/build/_shared/chunk-BOXFZXVX.js";
import {
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// empty-module:~/models/generate.server
var require_generate = __commonJS({
  "empty-module:~/models/generate.server"(exports, module) {
    module.exports = {};
  }
});

// app/routes/__layout/basic.tsx
var import_node = __toESM(require_node());
var import_generate = __toESM(require_generate());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/__layout/basic.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/__layout/basic.tsx"
  );
  import.meta.hot.lastModified = "1760869852826.6265";
}
function BasicPage() {
  _s();
  const errors = useActionData();
  const navigation = useNavigation();
  const isGenerating = navigation.state === "submitting";
  const generateButtonText = isGenerating ? "Generating..." : navigation.state === "loading" ? "Loading..." : "Generate";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "mx-2 flex max-w-lg flex-col gap-y-4 rounded-xl border border-neutral-700 p-6", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Create playlists based on the top songs from artists you follow on Spotify!" }, void 0, false, {
      fileName: "app/routes/__layout/basic.tsx",
      lineNumber: 65,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("details", { className: "rounded-lg border border-neutral-700 bg-neutral-800 p-2 text-sm", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("summary", { className: "cursor-pointer", children: "What are the selection methods?" }, void 0, false, {
        fileName: "app/routes/__layout/basic.tsx",
        lineNumber: 70,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-neutral-400", children: "Pick a selection method to change how your playlist is generated." }, void 0, false, {
        fileName: "app/routes/__layout/basic.tsx",
        lineNumber: 73,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "mt-2 flex flex-col gap-y-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
          "\u{1F525} ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: "Popular" }, void 0, false, {
            fileName: "app/routes/__layout/basic.tsx",
            lineNumber: 78,
            columnNumber: 10
          }, this),
          " - Use the most popular song from each artist."
        ] }, void 0, true, {
          fileName: "app/routes/__layout/basic.tsx",
          lineNumber: 77,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
          "\u{1F552} ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: "Latest" }, void 0, false, {
            fileName: "app/routes/__layout/basic.tsx",
            lineNumber: 81,
            columnNumber: 10
          }, this),
          " - Create a playlist of the latest releases!"
        ] }, void 0, true, {
          fileName: "app/routes/__layout/basic.tsx",
          lineNumber: 80,
          columnNumber: 6
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
          "\u{1F3B2} ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("b", { children: "Random" }, void 0, false, {
            fileName: "app/routes/__layout/basic.tsx",
            lineNumber: 84,
            columnNumber: 10
          }, this),
          " - Pot luck! Pick a random song from each artist. Maybe you'll discover some old favourites?"
        ] }, void 0, true, {
          fileName: "app/routes/__layout/basic.tsx",
          lineNumber: 83,
          columnNumber: 6
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/__layout/basic.tsx",
        lineNumber: 76,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/__layout/basic.tsx",
      lineNumber: 69,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", className: "flex w-full flex-col items-center gap-y-4 self-center sm:w-max", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { htmlFor: "playlist_title", className: "self-start", children: "Playlist Name:" }, void 0, false, {
        fileName: "app/routes/__layout/basic.tsx",
        lineNumber: 90,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(TextInput, { name: "playlist_title", id: "playlist_title", autoComplete: "off", placeholder: "insync mixtape", className: "w-full" }, void 0, false, {
        fileName: "app/routes/__layout/basic.tsx",
        lineNumber: 93,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PlaylistTypeGroup, {}, void 0, false, {
        fileName: "app/routes/__layout/basic.tsx",
        lineNumber: 94,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "flex items-center gap-x-2", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: isGenerating, className: "rounded-full bg-green-500 px-4 py-2 text-sm font-bold uppercase text-neutral-900 transition-colors hover:bg-green-400", children: generateButtonText }, void 0, false, {
          fileName: "app/routes/__layout/basic.tsx",
          lineNumber: 96,
          columnNumber: 6
        }, this),
        isGenerating ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, { initial: {
          x: -50,
          opacity: 0
        }, animate: {
          x: 0,
          opacity: 1
        }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Spinner, {}, void 0, false, {
          fileName: "app/routes/__layout/basic.tsx",
          lineNumber: 106,
          columnNumber: 8
        }, this) }, void 0, false, {
          fileName: "app/routes/__layout/basic.tsx",
          lineNumber: 99,
          columnNumber: 22
        }, this) : null
      ] }, void 0, true, {
        fileName: "app/routes/__layout/basic.tsx",
        lineNumber: 95,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/__layout/basic.tsx",
      lineNumber: 89,
      columnNumber: 4
    }, this),
    errors ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.p, { initial: {
      opacity: 0,
      y: -50
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "rounded-lg border border-red-300 bg-red-300/25 px-3 py-1", children: errors.message }, void 0, false, {
      fileName: "app/routes/__layout/basic.tsx",
      lineNumber: 110,
      columnNumber: 14
    }, this) : null
  ] }, void 0, true, {
    fileName: "app/routes/__layout/basic.tsx",
    lineNumber: 64,
    columnNumber: 10
  }, this);
}
_s(BasicPage, "I53x0ogqmrPCtv95gYQQL5uQUYc=", false, function() {
  return [useActionData, useNavigation];
});
_c = BasicPage;
function Spinner() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.svg, { fill: "#ffffff", width: "32px", height: "32px", viewBox: "0 0 32 32", version: "1.1", xmlns: "http://www.w3.org/2000/svg", animate: {
    rotate: 360
  }, transition: {
    repeat: Infinity,
    bounce: 0,
    ease: "linear",
    duration: 0.75
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("title", { children: "spinner-one-third" }, void 0, false, {
      fileName: "app/routes/__layout/basic.tsx",
      lineNumber: 134,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M16 0.75c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0c7.042 0.001 12.75 5.71 12.75 12.751 0 3.521-1.427 6.709-3.734 9.016v0c-0.226 0.226-0.365 0.538-0.365 0.883 0 0.69 0.56 1.25 1.25 1.25 0.346 0 0.659-0.14 0.885-0.367l0-0c2.759-2.76 4.465-6.572 4.465-10.782 0-8.423-6.828-15.251-15.25-15.251h-0z" }, void 0, false, {
      fileName: "app/routes/__layout/basic.tsx",
      lineNumber: 135,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/__layout/basic.tsx",
    lineNumber: 126,
    columnNumber: 10
  }, this);
}
_c2 = Spinner;
function PlaylistTypeGroup() {
  const itemClassName = "relative px-4 py-1 rounded-xl sm:rounded-full hover:bg-neutral-800 data-[state=checked]:bg-neutral-700 border border-neutral-900 transition-colors data-[state=checked]:border-neutral-500";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, { htmlFor: "selection", className: "self-start", children: "Selection method:" }, void 0, false, {
      fileName: "app/routes/__layout/basic.tsx",
      lineNumber: 142,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Root2, { defaultValue: "popular", loop: false, "aria-label": "Playlist type", orientation: "horizontal", id: "selection", name: "selection", className: "flex w-full flex-col gap-y-1 rounded-2xl border border-neutral-700 bg-neutral-900 p-1 text-base text-white sm:flex-row sm:gap-y-0 sm:gap-x-2 sm:rounded-full ", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Item2, { value: "popular", id: "r1", className: itemClassName, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "r1", className: "cursor-pointer", children: "Popular" }, void 0, false, {
        fileName: "app/routes/__layout/basic.tsx",
        lineNumber: 147,
        columnNumber: 6
      }, this) }, void 0, false, {
        fileName: "app/routes/__layout/basic.tsx",
        lineNumber: 146,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Item2, { value: "latest", id: "r2", className: itemClassName, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "r2", className: "cursor-pointer", children: "Latest" }, void 0, false, {
        fileName: "app/routes/__layout/basic.tsx",
        lineNumber: 152,
        columnNumber: 6
      }, this) }, void 0, false, {
        fileName: "app/routes/__layout/basic.tsx",
        lineNumber: 151,
        columnNumber: 5
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Item2, { value: "random", id: "r3", className: itemClassName, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "r3", className: "cursor-pointer", children: "Random" }, void 0, false, {
        fileName: "app/routes/__layout/basic.tsx",
        lineNumber: 157,
        columnNumber: 6
      }, this) }, void 0, false, {
        fileName: "app/routes/__layout/basic.tsx",
        lineNumber: 156,
        columnNumber: 5
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/__layout/basic.tsx",
      lineNumber: 145,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/__layout/basic.tsx",
    lineNumber: 141,
    columnNumber: 10
  }, this);
}
_c3 = PlaylistTypeGroup;
var _c;
var _c2;
var _c3;
$RefreshReg$(_c, "BasicPage");
$RefreshReg$(_c2, "Spinner");
$RefreshReg$(_c3, "PlaylistTypeGroup");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  BasicPage as default
};
//# sourceMappingURL=/build/routes/__layout/basic-MAG2S5KP.js.map
