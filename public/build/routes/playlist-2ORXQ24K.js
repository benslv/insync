import {
  BackgroundCircles
} from "/build/_shared/chunk-KJH6JLKY.js";
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

// app/routes/playlist.tsx
var import_node = __toESM(require_node());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app/routes/playlist.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app/routes/playlist.tsx"
  );
  import.meta.hot.lastModified = "1760871995830.4316";
}
function GeneratePage() {
  _s();
  const {
    playlist
  } = useLoaderData();
  const artists = playlist.tracks.items.filter((item) => item.track.type === "track").map((item) => item.track.artists[0].name).filter((name) => name !== void 0).slice(0, 3).map((name) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "text-green-500", children: name.toString() }, name, false, {
    fileName: "app/routes/playlist.tsx",
    lineNumber: 73,
    columnNumber: 184
  }, this)).reduce((prev, curr) => [prev, ", ", curr]);
  const {
    id: playlistId,
    name: playlistName,
    owner: {
      display_name: username
    },
    images
  } = playlist;
  const playlistUrl = `https://open.spotify.com/playlist/${playlistId}`;
  const playlistImageUrl = images?.[1]?.url || images?.[0].url || "/images/cover.png";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "h-screen overflow-hidden", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative z-10 flex h-full w-full items-center justify-center px-4", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "relative z-10 flex max-w-xl flex-col items-center justify-center gap-y-8", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.h1, { initial: {
        opacity: 0,
        y: -20
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "mb-2 text-center text-3xl sm:text-5xl", children: [
        "Your playlist with ",
        artists,
        " + others"
      ] }, void 0, true, {
        fileName: "app/routes/playlist.tsx",
        lineNumber: 89,
        columnNumber: 6
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        delay: 0.2
      }, className: "flex flex-col items-center space-y-4 rounded-lg border border-neutral-700 bg-neutral-800 px-8 py-8 shadow-md", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", { src: playlistImageUrl, alt: `Playlist for ${username}`, className: "h-52 w-52 bg-neutral-400 shadow-md", height: 208, width: 208 }, void 0, false, {
          fileName: "app/routes/playlist.tsx",
          lineNumber: 107,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "text-center", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { className: "text-2xl", children: playlistName || "insync mixtape" }, void 0, false, {
            fileName: "app/routes/playlist.tsx",
            lineNumber: 109,
            columnNumber: 8
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "text-sm text-neutral-300", children: [
            "For ",
            username || "you"
          ] }, void 0, true, {
            fileName: "app/routes/playlist.tsx",
            lineNumber: 110,
            columnNumber: 8
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/playlist.tsx",
          lineNumber: 108,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: playlistUrl, target: "_blank", rel: "noreferrer", className: "w-max rounded-full bg-green-500 px-4 py-2 text-sm font-bold uppercase text-neutral-900 transition-colors hover:bg-green-400", children: "Open" }, void 0, false, {
          fileName: "app/routes/playlist.tsx",
          lineNumber: 114,
          columnNumber: 7
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/playlist.tsx",
        lineNumber: 98,
        columnNumber: 6
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/playlist.tsx",
      lineNumber: 88,
      columnNumber: 5
    }, this) }, void 0, false, {
      fileName: "app/routes/playlist.tsx",
      lineNumber: 87,
      columnNumber: 4
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, transition: {
      delay: 0.5,
      duration: 2
    }, className: "relative top-2/3 z-0 sm:top-1/2", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(BackgroundCircles, {}, void 0, false, {
      fileName: "app/routes/playlist.tsx",
      lineNumber: 128,
      columnNumber: 5
    }, this) }, void 0, false, {
      fileName: "app/routes/playlist.tsx",
      lineNumber: 120,
      columnNumber: 4
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/playlist.tsx",
    lineNumber: 86,
    columnNumber: 10
  }, this);
}
_s(GeneratePage, "g/1ectL//e60mkltRe3HCZ76okc=", false, function() {
  return [useLoaderData];
});
_c = GeneratePage;
var _c;
$RefreshReg$(_c, "GeneratePage");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  GeneratePage as default
};
//# sourceMappingURL=/build/routes/playlist-2ORXQ24K.js.map
