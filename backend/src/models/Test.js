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
        // generateFilename: function (file, index) {
        //     console.log(file);
        //     console.log(index);
            
        //     return file.originalname;
        // },
        whenExists: 'retry',
        publicPath: '/public/testFiles',
    },
});

Test.add({
    testName: {
        type: String,
        required: true,
        initial: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    data: {
        type: Types.File,
        storage: testCsvStorage,
        mimetype: '.csv',
        required: true,
        initial: true
    },
});

Test.register();