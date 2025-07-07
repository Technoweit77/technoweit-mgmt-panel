import express from "express";

let Server = express();


Server.get("/", (req, res) => {
    res.send("Hello World!");
});


Server.listen(5000, () => {
    console.log("Server is running on port 5000");
});
