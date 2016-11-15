"use strict";

// Dependencies
const fs = require("fs");
const log = console.log;
const walk = require("./walk");
const path = require("path");
const distHTML = require("./dist-html");
const CommandsRunner = require("./commands-runner");
const benchmark = require("./benchmark");
const RequestPromise = require("./request-promise");
const TableTreeNode = require("./table-tree");
const inlineImports = require("./inline-imports");
const extract = require("./extract");
const TaskRunner = require("./task-runner");
const stripComments = require("./strip-comments");
const DepsInstaller = require("./deps-installer");


var d = path.resolve(__dirname, "deps-installer", "test" , "dir2");

DepsInstaller.install({
  destination: d,
  dependencies: [
    "task-runner",
    "inline-imports",
    "dist-html"
  ]
});
