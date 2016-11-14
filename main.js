"use strict";

// Dependencies
const fs = require("fs");
const log = console.log;
const walk = require("./walk");
const distHTML = require("./distHTML");
const path = require("path");
const CommandsRunner = require("./commands-runner");
const benchmark = require("./benchmark");
const RequestPromise = require("./request-promise");
const packer = require("./packer/packer");
const TableTreeNode = require("./deps/table-tree");
const inlineImports = require("./utils/inliner").inlineImports;
const extract = require("./utils/extract");
const TaskRunner = require("./task-runner/task-runner");

// Constants
const TEST_ROOT_DIR = path.resolve(__dirname, "./test");

var p = path.resolve(TEST_ROOT_DIR, "inlineImports-test", "entry.js");

TaskRunner
  .text(p)
  .task(inlineImports)
  .output({
    dir: "./dist",
    name: "entry.dist.js"
  });

require("./test/inlineImports-test/dist/entry.dist");
