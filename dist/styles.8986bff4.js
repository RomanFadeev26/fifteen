// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"styles.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./img/1/image_part_002.png":[["image_part_002.ac0bac59.png","img/1/image_part_002.png"],"img/1/image_part_002.png"],"./img/1/image_part_003.png":[["image_part_003.6cb62774.png","img/1/image_part_003.png"],"img/1/image_part_003.png"],"./img/1/image_part_004.png":[["image_part_004.6fa2ccf4.png","img/1/image_part_004.png"],"img/1/image_part_004.png"],"./img/1/image_part_005.png":[["image_part_005.a9df7dcd.png","img/1/image_part_005.png"],"img/1/image_part_005.png"],"./img/1/image_part_006.png":[["image_part_006.036a64a7.png","img/1/image_part_006.png"],"img/1/image_part_006.png"],"./img/1/image_part_007.png":[["image_part_007.959d23d0.png","img/1/image_part_007.png"],"img/1/image_part_007.png"],"./img/1/image_part_008.png":[["image_part_008.140dcd24.png","img/1/image_part_008.png"],"img/1/image_part_008.png"],"./img/1/image_part_009.png":[["image_part_009.61d3a0f0.png","img/1/image_part_009.png"],"img/1/image_part_009.png"],"./img/1/image_part_010.png":[["image_part_010.1629bc02.png","img/1/image_part_010.png"],"img/1/image_part_010.png"],"./img/1/image_part_011.png":[["image_part_011.8b166fb4.png","img/1/image_part_011.png"],"img/1/image_part_011.png"],"./img/1/image_part_012.png":[["image_part_012.45935f0a.png","img/1/image_part_012.png"],"img/1/image_part_012.png"],"./img/1/image_part_013.png":[["image_part_013.38dc5ac7.png","img/1/image_part_013.png"],"img/1/image_part_013.png"],"./img/1/image_part_014.png":[["image_part_014.378f0abe.png","img/1/image_part_014.png"],"img/1/image_part_014.png"],"./img/1/image_part_015.png":[["image_part_015.866bb5b9.png","img/1/image_part_015.png"],"img/1/image_part_015.png"],"./img/1/image_part_016.png":[["image_part_016.2645a3cd.png","img/1/image_part_016.png"],"img/1/image_part_016.png"],"./img/2/image_part_002.jpg":[["image_part_002.04f6f2d9.jpg","img/2/image_part_002.jpg"],"img/2/image_part_002.jpg"],"./img/2/image_part_003.jpg":[["image_part_003.beb34720.jpg","img/2/image_part_003.jpg"],"img/2/image_part_003.jpg"],"./img/2/image_part_004.jpg":[["image_part_004.cfbe34c7.jpg","img/2/image_part_004.jpg"],"img/2/image_part_004.jpg"],"./img/2/image_part_005.jpg":[["image_part_005.d3051e0f.jpg","img/2/image_part_005.jpg"],"img/2/image_part_005.jpg"],"./img/2/image_part_006.jpg":[["image_part_006.967644c5.jpg","img/2/image_part_006.jpg"],"img/2/image_part_006.jpg"],"./img/2/image_part_007.jpg":[["image_part_007.99991fa1.jpg","img/2/image_part_007.jpg"],"img/2/image_part_007.jpg"],"./img/2/image_part_008.jpg":[["image_part_008.3c2401ef.jpg","img/2/image_part_008.jpg"],"img/2/image_part_008.jpg"],"./img/2/image_part_009.jpg":[["image_part_009.9e97109d.jpg","img/2/image_part_009.jpg"],"img/2/image_part_009.jpg"],"./img/2/image_part_010.jpg":[["image_part_010.9c2b32b1.jpg","img/2/image_part_010.jpg"],"img/2/image_part_010.jpg"],"./img/2/image_part_011.jpg":[["image_part_011.59e640ce.jpg","img/2/image_part_011.jpg"],"img/2/image_part_011.jpg"],"./img/2/image_part_012.jpg":[["image_part_012.064594d1.jpg","img/2/image_part_012.jpg"],"img/2/image_part_012.jpg"],"./img/2/image_part_013.jpg":[["image_part_013.201b8b20.jpg","img/2/image_part_013.jpg"],"img/2/image_part_013.jpg"],"./img/2/image_part_014.jpg":[["image_part_014.af95c87a.jpg","img/2/image_part_014.jpg"],"img/2/image_part_014.jpg"],"./img/2/image_part_015.jpg":[["image_part_015.4d56ed30.jpg","img/2/image_part_015.jpg"],"img/2/image_part_015.jpg"],"./img/2/image_part_016.jpg":[["image_part_016.0fc2eb7c.jpg","img/2/image_part_016.jpg"],"img/2/image_part_016.jpg"],"./img/3/image_part_002.png":[["image_part_002.f13fe9cc.png","img/3/image_part_002.png"],"img/3/image_part_002.png"],"./img/3/image_part_003.png":[["image_part_003.55bf77f6.png","img/3/image_part_003.png"],"img/3/image_part_003.png"],"./img/3/image_part_004.png":[["image_part_004.67b111d9.png","img/3/image_part_004.png"],"img/3/image_part_004.png"],"./img/3/image_part_005.png":[["image_part_005.c99786a4.png","img/3/image_part_005.png"],"img/3/image_part_005.png"],"./img/3/image_part_006.png":[["image_part_006.ff6f4e95.png","img/3/image_part_006.png"],"img/3/image_part_006.png"],"./img/3/image_part_007.png":[["image_part_007.2d9a827e.png","img/3/image_part_007.png"],"img/3/image_part_007.png"],"./img/3/image_part_008.png":[["image_part_008.4834360d.png","img/3/image_part_008.png"],"img/3/image_part_008.png"],"./img/3/image_part_009.png":[["image_part_009.e91f34b7.png","img/3/image_part_009.png"],"img/3/image_part_009.png"],"./img/3/image_part_010.png":[["image_part_010.54280421.png","img/3/image_part_010.png"],"img/3/image_part_010.png"],"./img/3/image_part_011.png":[["image_part_011.366a1ebc.png","img/3/image_part_011.png"],"img/3/image_part_011.png"],"./img/3/image_part_012.png":[["image_part_012.764ae923.png","img/3/image_part_012.png"],"img/3/image_part_012.png"],"./img/3/image_part_013.png":[["image_part_013.b6fa7509.png","img/3/image_part_013.png"],"img/3/image_part_013.png"],"./img/3/image_part_014.png":[["image_part_014.1925de6a.png","img/3/image_part_014.png"],"img/3/image_part_014.png"],"./img/3/image_part_015.png":[["image_part_015.2974f6fb.png","img/3/image_part_015.png"],"img/3/image_part_015.png"],"./img/3/image_part_016.png":[["image_part_016.fadd534d.png","img/3/image_part_016.png"],"img/3/image_part_016.png"],"./img/4/image_part_002.png":[["image_part_002.6c45b9a2.png","img/4/image_part_002.png"],"img/4/image_part_002.png"],"./img/4/image_part_003.png":[["image_part_003.1f57a6a7.png","img/4/image_part_003.png"],"img/4/image_part_003.png"],"./img/4/image_part_004.png":[["image_part_004.5fd42f26.png","img/4/image_part_004.png"],"img/4/image_part_004.png"],"./img/4/image_part_005.png":[["image_part_005.cac86be8.png","img/4/image_part_005.png"],"img/4/image_part_005.png"],"./img/4/image_part_006.png":[["image_part_006.beabc23c.png","img/4/image_part_006.png"],"img/4/image_part_006.png"],"./img/4/image_part_007.png":[["image_part_007.a0e4c7b0.png","img/4/image_part_007.png"],"img/4/image_part_007.png"],"./img/4/image_part_008.png":[["image_part_008.6bfff1ad.png","img/4/image_part_008.png"],"img/4/image_part_008.png"],"./img/4/image_part_009.png":[["image_part_009.e8d67961.png","img/4/image_part_009.png"],"img/4/image_part_009.png"],"./img/4/image_part_010.png":[["image_part_010.d0f9b67c.png","img/4/image_part_010.png"],"img/4/image_part_010.png"],"./img/4/image_part_011.png":[["image_part_011.0df8963b.png","img/4/image_part_011.png"],"img/4/image_part_011.png"],"./img/4/image_part_012.png":[["image_part_012.cae15467.png","img/4/image_part_012.png"],"img/4/image_part_012.png"],"./img/4/image_part_013.png":[["image_part_013.85710a25.png","img/4/image_part_013.png"],"img/4/image_part_013.png"],"./img/4/image_part_014.png":[["image_part_014.30bcaed2.png","img/4/image_part_014.png"],"img/4/image_part_014.png"],"./img/4/image_part_015.png":[["image_part_015.76a8aa58.png","img/4/image_part_015.png"],"img/4/image_part_015.png"],"./img/4/image_part_016.png":[["image_part_016.c209b260.png","img/4/image_part_016.png"],"img/4/image_part_016.png"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59490" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js"], null)
//# sourceMappingURL=/styles.8986bff4.js.map