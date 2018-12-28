var keystone = require('keystone');
var Types = keystone.Field.Types;

var Request = new keystone.List('Request', {
    autokey: { path: 'id', from: '_id', unique: true },
    defaultSort: '-id',
});

Request.add({
    testId: {
        type: Types.Relationship,
        ref: 'Test',
        many: false,
        required: false,
        initial: false
    },
    // '"Connect"': {
    //     type: Number,
    //     required: true,
    //     initial: true,
    // },
    IdleTime: {
        type: Number,
        required: true,
        initial: true
    },
    Latency: {
        type: Number,
        required: true,
        initial: true
    },
    allThreads: {
        type: Number,
        required: true,
        initial: true
    },
    bytes: {
        type: Number,
        required: true,
        initial: true
    },
    dataType: {
        type: String,
        required: true,
        initial: true
    },
    elapsed: {
        type: Number,
        required: true,
        initial: true
    },
    failureMessage: {
        type: String,
        required: true,
        initial: true
    },
    label: {
        type: String,
        required: true,
        initial: true
    },
    responseCode: {
        type: Number,
        required: true,
        initial: true
    },
    responseMessage: {
        type: String,
        required: true,
        initial: true
    },
    sentBytes: {
        type: Number,
        required: true,
        initial: true
    },
    success: {
        type: Boolean,
        required: true,
        initial: true
    },
    threadName: {
        type: String,
        required: true,
        initial: true
    },
    timeStamp: {
        type: String,
        required: true,
        initial: true
    },
});

Request.register();