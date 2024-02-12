const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());
mongoose
  .connect(
    "mongodb+srv://shindedhirendra780:Dhirendra%402003@users.9e6kw7j.mongodb.net/userAuthentication"
  )
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.get("/", (req, resp) => {
  resp.send("express is runnign");
});

//user schema:
const Users = mongoose.model("users", {
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: function () {
      return new Date().toLocaleDateString();
    },
  },
});

//registraion
app.post("/signup", async (req, resp) => {
  //resp.send("working")
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return resp
      .status(400)
      .json({ success: false, error: "mail already exists!!try loggin in" });
  }
  let cart = {};
  for (let i = 0; i < 30; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id,
    },
  };

  resp.json({ success: true });
  console.log("user registered with name:" + req.body.username);
});

app.post("/login", async (req, resp) => {
  //resp.send("working")
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };

      resp.json({ success: true, remark: "login successful !!" });
    } else {
      resp.json({ success: false, error: "wrong password" });
    }
  } else {
    resp.json({ success: false, error: "email is not registered!!" });
  }
});

app.post("/reset", async (req, resp) => {
  // resp.send("working")
  console.log(req.body)
  let user = await Users.updateOne(
    { email: req.body.email },
    { $set: { password: req.body.password } }
  );
  console.log(user)
  if (user.matchedCount) {
    const passCompare = req.body.password === user.password;
    if (user.acknowledged) {
      resp.json({ success: true, remark: "password reset successful !!" });
    } else {
      resp.json({ success: false, error: "password change failed" });
    }
  } else {
    resp.json({ success: false, error: "email is not registered!!" });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log("server running on port 5000");
  } else {
    console.log("error:" + error);
  }
});
