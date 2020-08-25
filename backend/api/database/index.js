const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://open:123456789open@open.jo5wc.mongodb.net/open?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.Promise = global.Promise;

module.exports = mongoose;
