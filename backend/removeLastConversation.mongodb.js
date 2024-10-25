use("GigChain");

// db.conversations.find().sort({ _id: -1 }).limit(1);

db.conversations.deleteOne({}, { sort: { _id: -1 } });

// db.getCollection('conversations').remove({});

// const users = db.getCollection('conversations').find({}).toArray();

// console.log(users);
