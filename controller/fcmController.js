const FCM = require("fcm-node");
require("dotenv").config();

const serverKey = process.env.SERVER_KEY;

// creating a new FCM instance with the server key
const fcm = new FCM(serverKey);

const sendNotification = async (deviceToken, title, body) => {
  // message to be sent
  const message = {
    to: deviceToken, // device to which the message will be sent
    notification: {
      title: title,
      body: body,
    },
  };

  // send message
  return new Promise((resolve, reject) => {
    fcm.send(message, function (err, res) {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

module.exports = sendNotification;
