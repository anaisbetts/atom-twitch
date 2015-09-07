'use babel';

import _ from 'lodash';
import Module from 'module';
import path from 'path';
import url from 'url';

let domModule = null;

// Public: Determine the filename of the current HTML import by abusing call
// stacks
//
// Returns the first file in the call-stack that ends in HTML, which in an HTML
// import script tag, will be the import.
export function filenameForImport(name) {
  domModule = domModule || document.createElement('dom-module');

  let href = url.parse(domModule.import(name).baseURI);
  let filePath = decodeURIComponent(href.pathname);
  if (process.platform === 'win32') {
    filePath = filePath.slice(1);
  }

  return path.resolve(filePath);
}

// Private: This method registers a {Module} with the module cache directly,
// so that further calls to 'require' will return this object without actually
// attempting to load the file.
//
// filename - the fully qualified path to the file to register as
// exportObject - the value that require should return (i.e. what your module
//                would normally set as module.exports)
//
// Returns nothing.
function fakeModuleLoad(filename, exportObject) {
  var mod = new Module(filename, process.mainModule);

  mod.filename = filename;
  mod.paths = Module._nodeModulePaths(path.dirname(filename));
  mod.loaded = true;
  mod.exports = exportObject;

  Module._cache[filename] = mod;
  process.mainModule.children.push(mod);
}

// Public: This ES7 Decorator method registers a class as a Polymer component.
// This means, instead of calling Polymer, you should declare a class with a
// static method 'properties' that returns the properties of the class, and
// decorate it with this method, which will turn the class definition into a
// Polymer object and register it.
//
// This method also registers the returned constructor as a Node module, so
// that require'ing the containing HTML file will return a constructor Function
// for the new element.
export function component(name, extendName) {
  return function decorator(klass) {
    if (!klass.properties) {
      throw new Error(`Declare a static method or property on ${klass.name} called 'properties'`);
    }

    let newProto = _.reduce(Object.getOwnPropertyNames(klass.prototype), (acc,x) => {
      acc[x] = klass.prototype[x];
      return acc;
    }, {});

    Object.setPrototypeOf(newProto, Object.getPrototypeOf(klass.prototype));
    delete newProto.constructor;

    let props = typeof(klass.properties === 'function') ?
      klass.properties() : klass.properties;
      
    if (klass.listeners) {
      newProto.listeners = typeof(klass.listeners) === 'function' ?
        klass.listeners() : klass.listeners;
    }
    
    newProto.is = name;
    if (extendName) {
      newProto.extends = extendName;
    }

    newProto.properties = props;

    window.Polymer(newProto);

    let ctor = function(...args) {
      let factoryArgs = extendName ? [extendName, name] : [name];
      let el = document.createElement.apply(document, factoryArgs);

      if (newProto.factoryImpl) {
        newProto.factoryImpl.apply(el, args);
      }

      return el;
    };

    fakeModuleLoad(filenameForImport(name), ctor);
  };
}
