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
})({"graph.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialGraph = exports.calculateGraph = exports.MAX_CELL = exports.MIN_CELL = void 0;
var initialCells = Array(16).fill(undefined).map(function (_, i) {
  return i;
});
var MIN_CELL = 0;
exports.MIN_CELL = MIN_CELL;
var MAX_CELL = 15;
exports.MAX_CELL = MAX_CELL;
var borderLeft = [0, 4, 8, 12];
var borderRight = borderLeft.map(function (cellN) {
  return cellN + 3;
});

var calculateGraph = function calculateGraph(cells) {
  return cells.map(function (cell, i) {
    var left = i - 1;
    var right = i + 1;
    var top = i - 4;
    var down = i + 4;
    var isLeft = borderLeft.includes(i);
    var isRight = borderRight.includes(i);
    var isTop = top < MIN_CELL;
    var isDown = down > MAX_CELL;
    var edges = [cells[left], cells[right], cells[top], cells[down]];

    if (isTop) {
      edges = edges.filter(function (edge) {
        return edge !== cells[top];
      });
    }

    if (isDown) {
      edges = edges.filter(function (edge) {
        return edge !== cells[down];
      });
    }

    if (isRight) {
      edges = edges.filter(function (edge) {
        return edge !== cells[right];
      });
    }

    if (isLeft) {
      edges = edges.filter(function (edge) {
        return edge !== cells[left];
      });
    }

    return {
      vertex: cells[i],
      edges: edges
    };
  });
};

exports.calculateGraph = calculateGraph;
var initialGraph = calculateGraph(initialCells);
/*
* todo Нужна функция, которая принимает список HTML-элементов и возвращает новый граф
*      так мы будем знать, куда переехала новая вершина и какие у неё соседи
* */

exports.initialGraph = initialGraph;
},{}],"move.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.move = void 0;

var _graph = require("./graph");

var move = function move(cell, graph) {
  if (cell > _graph.MAX_CELL || cell < _graph.MIN_CELL) {
    return null;
  }

  var cellVertex = graph.find(function (vertex) {
    return vertex.vertex === cell;
  });
  var hasEmptyCell = cellVertex.edges.filter(function (edge) {
    return edge === 0;
  }).length > 0;

  if (!hasEmptyCell) {
    return null;
  }

  var vertexes = graph.map(function (vertex) {
    return vertex.vertex;
  });
  var emptyIndex = vertexes.indexOf(0);
  var cellIndex = vertexes.indexOf(cell);
  vertexes.splice(emptyIndex, 1, cell);
  vertexes.splice(cellIndex, 1, 0);
  return (0, _graph.calculateGraph)(vertexes);
};

exports.move = move;
},{"./graph":"graph.js"}],"render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = void 0;

var render = function render(graph) {
  if (graph === null) {
    return null;
  }

  var grid = document.querySelector('.grid');
  grid.innerHTML = '';
  var cells = graph.map(function (vertex) {
    return vertex.vertex;
  });
  var cellElements = cells.map(function (cell) {
    var cellElement = document.createElement('div');
    cellElement.className = "cell cell".concat(cell);

    if (cell === 0) {
      cellElement.classList.add('empty');
      cellElement.innerHTML = '';
    }

    cellElement.dataset.cell = cell;
    return cellElement;
  });
  cellElements.forEach(function (cellElement) {
    grid.appendChild(cellElement);
  });
};

exports.render = render;
},{}],"index.js":[function(require,module,exports) {
"use strict";

var _graph = require("./graph");

var _move = require("./move");

var _render = require("./render");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var graph = _graph.initialGraph;

var clickHandler = function clickHandler(cell) {
  var newGraph = (0, _move.move)(Number(cell), graph);

  if (!newGraph) {
    return null;
  }

  graph = newGraph;
  (0, _render.render)(graph);

  var cells = _toConsumableArray(document.querySelectorAll('.cell'));

  cells.forEach(function (cellElement) {
    cellElement.addEventListener('click', function (e) {
      clickHandler(e.target.dataset.cell);
    });
  });
};

var randomGenerator = function randomGenerator() {
  return Math.floor(Math.random() * 16);
};

(0, _render.render)(graph);
var startButton = document.querySelector('.empty');

var start = function start() {
  var intervalId = setInterval(function () {
    clickHandler(randomGenerator());
  }, 10);
  setTimeout(function () {
    clearInterval(intervalId);
  }, 5000);
  startButton.removeEventListener('click', start);
};

startButton.addEventListener('click', start);

var cells = _toConsumableArray(document.querySelectorAll('.cell'));

cells.forEach(function (cellElement) {
  cellElement.addEventListener('click', function (e) {
    clickHandler(e.target.dataset.cell);
  });
});
},{"./graph":"graph.js","./move":"move.js","./render":"render.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49314" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map