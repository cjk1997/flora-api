const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = process.env.DB_URL;

const dbName = 'flora';
const colName = 'products';

const settings= { useUnifiedTopology: true };

const getProducts = () => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to retrieve products.");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.find({}).toArray(function(err, docs) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

const getProductByID = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to retrieve product by ID.");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.find({ _id: ObjectID(id) }).toArray(function(err, docs) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

const createProduct = (product) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to create product.");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.insertOne(product, (err, docs) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

const updateProduct = (id, key, updatedInfo) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to update product.");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.updateOne({ _id: ObjectID(id) },
                { $set: { [key]: updatedInfo } },
                function(err, docs) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

const deleteProduct = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to delete product.");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.deleteOne({ _id: ObjectID(id) }, (err, docs) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve({ deletedID: id });
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

module.exports = {
    getProducts,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct
};