import * as dotenv from 'dotenv';
import mongoose, { Mongoose } from 'mongoose';
dotenv.config();

class Connection {
  constructor() {
    try {
      const url = process.env.MONGO_URI
      console.log(`establish new connection to the database`);
      mongoose.Promise = global.Promise;
      mongoose.set('useNewUrlParser', true);
      mongoose.set('useFindAndModify', false);
      mongoose.set('useCreateIndex', true);
      mongoose.set('useUnifiedTopology', true);
      mongoose.connect(url);
    } catch (err) {
      console.error(err);
    }
  }
}

export default new Connection();