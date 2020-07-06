const mongoose = require("mongoose");
const express = require("express");
const colors = require("colors");

const app = express();
require("dotenv").config();

// MongoDB URI | Special
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}cluster0-zlxgj.mongodb.net/blogApi`;

mongoose.connect(uri).then(() => {
  const server = app.listen(1237);

  mongoose.connection.db.dropCollection("notifications", function (
    err,
    result
  ) {
    mongoose.connection.db.dropCollection("conversations", function (
      err1,
      result1
    ) {
      mongoose.connection.db.dropCollection("chats", async function (
        err2,
        result2
      ) {
        const ErrorStringNotifications =
          "Error in deleting notifications - " + err;
        const ErrorStringConversations =
          "Error in deleting conversations - " + err1;
        const ErrorStringChats = "Error in deleting chats - " + err2;
        const ResultNotifications = "Result notifications - " + result;
        const ResultConversations = "Result conversations - " + result1;
        const ResultChats = "Result chats - " + result2;
        console.log(ErrorStringNotifications.red);
        console.log(ErrorStringConversations.red);
        console.log(ErrorStringChats.red);
        console.log(ResultNotifications.blue);
        console.log(ResultConversations.blue);
        console.log(ResultChats.blue);

        const query = {
          $or: [
            {
              notifications: { $exists: true, $not: { $size: 0 } },
            },
            {
              conversations: { $exists: true, $not: { $size: 0 } },
            },
          ],
        };

        await mongoose.connection.db.collection("users").updateMany(query, {
          $set: { notifications: [], conversations: [] },
        });

        process.exit();
      });
    });
  });
});
