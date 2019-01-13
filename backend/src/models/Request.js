var keystone = require('keystone');

var Request = new keystone.List('Request');

Request.add({
    IdleTime: {
        type: Number,
        required: false,
        initial: false
    },
    Latency: {
        type: Number,
        required: false,
        initial: false
    },
    allThreads: {
        type: Number,
        required: false,
        initial: false
    },
    bytes: {
        type: Number,
        required: false,
        initial: false
    },
    dataType: {
        type: String,
        required: false,
        initial: false
    },
    elapsed: {
        type: Number,
        required: false,
        initial: false
    },
    failureMessage: {
        type: String,
        required: false,
        initial: false
    },
    label: {
        type: String,
        required: false,
        initial: false
    },
    responseCode: {
        type: Number,
        required: false,
        initial: false
    },
    responseMessage: {
        type: String,
        required: false,
        initial: false
    },
    sentBytes: {
        type: Number,
        required: false,
        initial: false
    },
    success: {
        type: Boolean,
        required: false,
        initial: false
    },
    threadName: {
        type: String,
        required: false,
        initial: false
    },
    timeStamp: {
        type: String,
        required: false,
        initial: false
    },
});

Request.register();