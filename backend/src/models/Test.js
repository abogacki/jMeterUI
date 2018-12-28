var keystone = require('keystone');
var Types = keystone.Field.Types;

var Test = new keystone.List('Test', {
    autokey: { path: 'slug', from: 'name', unique: true },
    defaultSort: '-createdAt',
});

var testCsvStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: keystone.expandPath('/public/testFiles'),
        whenExists: 'retry',
        publicPath: '/public/testFiles',
    },
});

Test.add({
    name: {
        type: String,
        required: false,
        initial: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    file: {
        type: Types.File,
        storage: testCsvStorage,
        mimetype: '.csv',
        required: false,
        initial: true
    },
    testData: {
        type: Types.Relationship,
        ref: 'Request',
        many: true,
        // required: true,
        // initial: true
    }
});

Test.register();