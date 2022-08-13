"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simple_pipe_1 = require("@discall/simple-pipe");
const https_1 = require("./https");
const message_1 = require("./message");
(0, https_1.create)(channel((0, message_1.message)({})));
(0, simple_pipe_1.pipeline)(message_1.message, channel, https_1.create).execute({});
