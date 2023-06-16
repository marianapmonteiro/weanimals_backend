
const mongoose = require("mongoose");

require("dotenv").config();

mongoose.set("strictQuery", true)

async function main() {
    await mongoose.connect(process.env.DB);
    console.log("Conectado ao db")
}
main().catch((err) => console.log(err));

module.exports = main;