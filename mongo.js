const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const content = process.argv[3];
const important = process.argv[4];

const url = `mongodb+srv://fullstack:${password}@cluster0.kkgxr.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const notes = [
  { content: "HTML is Easy", date: new Date(), important: true },
  {
    content: "Mongoose makes use of mongo easy",
    date: new Date(),
    important: true,
  },
  { content: "Callback-function suck", date: new Date(), important: true },
];

const note = new Note({
  content: content,
  date: new Date(),
  important: important,
});

note.save().then(() => {
  console.log(`added ${content} importance is ${important} to note`);
  mongoose.connection.close();
});

// Note.insertMany(notes).then(() => console.log('ntoes are added!'));

// Note.find({}).then(result => {
//     result.forEach(note => {
//       console.log(note)
//     })
//     mongoose.connection.close()
//   })
