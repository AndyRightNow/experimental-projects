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

// Constants
const TEST_ROOT_DIR = path.resolve(__dirname, "../test");

var root = new TableTreeNode();

