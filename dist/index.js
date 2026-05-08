"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
// Create a new client instance
const client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth(),
});
// When the client is ready, run this code (only once)
client.once("ready", () => {
    console.log("Client is ready!");
});
// When the client received QR-Code
client.on("qr", (qr) => {
    qrcode_terminal_1.default.generate(qr, { small: true });
});
client.on("message_create", (message) => {
    if (message.body === "!ping") {
        client.sendMessage(message.from, "pong");
    }
});
client.on("message_create", (message) => {
    if (message.body === "!ping") {
        message.reply("pong");
    }
});
// Start your client
client.initialize();
