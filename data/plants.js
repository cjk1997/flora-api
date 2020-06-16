const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const url = process.env.DB_URL;

const dbName = 'flora';
const colName = 'plants';

const settings = { useUnifiedTopology: true };

const getPlants = () => {
    const iou = new Promise ((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to retrieve plants.");
                const db = client.db(dbName);
                console.log(db);
                const collection = db.collection(colName);
                collection.find({}).toArray(function(err, docs) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs)
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

const addPlant = () => {
    const iou = new Promise ((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to add plant.");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.insertOne(plants, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.ops[0]);
                        client.close();
                    };
                });
            };
        });
    });
    return iou;
};

const updatePlant = (id, plant) => {
    const iou = new Promise ((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to update plant.");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.replaceOne({ id : ObjectID(id) },
                    plant,
                    { upsert : true },
                    (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                            client.close();
                        };
                    }
                );
            };
        });
    });
    return iou;
};

const updatePlantDetails = (id, details) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to update plant details.");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.updateOne({ _id: ObjectID(id) },
                
                )
            }
        })
    })
}

const deletePlant = (id) => {
    const iou = new Promise((resolve, reject) => {
        MongoClient.connect(url, settings, function(err, client) {
            if (err) {
                reject(err);
            } else {
                console.log("Connected to server to delete plant.");
                const db = client.db(dbName);
                const collection = db.collection(colName);
                collection.deleteOne({ _id : ObjectID(id) }, (err, result) => {
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
    getPlants,
    addPlant,
    updatePlant,
    updatePlantDetails,
    deletePlant
};