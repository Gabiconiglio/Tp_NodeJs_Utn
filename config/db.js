const mongoose= require("mongoose");

const db_uri=process.env.db_uri;
mongoose.connect(db_uri);