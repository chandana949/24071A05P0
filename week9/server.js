const http = require("http");
const os = require("os");
const path = require("path");
const EventEmitter = require("events");

const eventEmitter = new EventEmitter();

eventEmitter.on("request_received", (url) => {
    console.log(`Request received for: ${url}`);
});

const server = http.createServer((req, res) => {

    eventEmitter.emit("request_received", req.url);

    // 🔹 HOME
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
            <h2>Welcome to Custom Node Server</h2>
            <ul>
                <li><a href="/os">OS Info</a></li>
                <li><a href="/path">Path Info</a></li>
                <li><a href="/event">Event Demo</a></li>
            </ul>
        `);
    }

    // 🔹 OS MODULE
    else if (req.url === "/os") {
        res.writeHead(200, { "Content-Type": "text/html" });

        res.end(`
            <h2>OS Module Info</h2>
            <p>Platform: ${os.platform()}</p>
            <p>CPU Architecture: ${os.arch()}</p>
            <p>Free Memory: ${os.freemem()}</p>
            <p>Total Memory: ${os.totalmem()}</p>
        `);
    }

    // 🔹 PATH MODULE
    else if (req.url === "/path") {
        const filePath = path.join(__dirname, "server.js");

        res.writeHead(200, { "Content-Type": "text/html" });

        res.end(`
            <h2>Path Module Info</h2>
            <p>File Name: ${path.basename(filePath)}</p>
            <p>Directory: ${__dirname}</p>
            <p>Extension: ${path.extname(filePath)}</p>
        `);
    }

    // 🔹 EVENT MODULE
    else if (req.url === "/event") {

        eventEmitter.once("custom_event", () => {
            console.log("Event page visited at:", new Date().toLocaleString());
        });

        eventEmitter.emit("custom_event");

        res.writeHead(200, { "Content-Type": "text/html" });

        res.end(`
            <h2>Event Module Demo</h2>
            <p>Check console for event message!</p>
        `);
    }

    // 🔹 404
    else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h2>404 - Page Not Found</h2>");
    }
});

server.listen(3001, () => {
    console.log("Server running at http://localhost:3001");
});