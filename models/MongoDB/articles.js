const mongoose = require("mongoose");

// Mongo DB Schema
const articleSchema = mongoose.Schema({
    title: { 
        type: String,
        required: true
    },
    type: { 
        type: String,
        required: true,
    },
    brand: { 
        type: String,
        default: null
    },
    capacity: { 
        type: String,
        default: null
    },
    speed: { 
        type: String,
        default: null
    },
    casLatency: { 
        type: Number,
        default: null
    },
    image: { 
        type: String,
        required: true
    },
    price: { 
        type: Number,
        required: true
    },
    stock: { 
        type: Number,
        required: true,
        default: 0
    },
    rating: { 
        type: Number,
        default: null
    },
    modular: { 
        type: String,
        default: null
    },
    interface: { 
        type: String,
        default: null
    },
    wattage: { 
        type: String,
        default: null
    },
    efficiency: { 
        type: String,
        default: null
    },
    cores: { 
        type: Number,
        default: null
    },
    threads: { 
        type: String,
        default: null
    },
    clockSpeed: { 
        type: String,
        default: null
    },
});

const articlesDBMongo = mongoose.model("Articles", articleSchema);

module.exports = articlesDBMongo;
