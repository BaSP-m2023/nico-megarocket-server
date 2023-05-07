const express = require("express");
const sAdmins = require("../data/super-admins.json");
const fs = require("fs");

function SpaceFounder() {
  hasSpace = false;
  for (let i = 0; i < sAdmins.length - 1; i++) {
    if (sAdmins[i] === " ") {
      hasSpace = true;
    }
  }
}

//GET
express.get("/get", (req, res) => {
  if (SpaceFounder(sAdmins) === false) {
    response.send(sAdmins);
  } else {
    response.send("Dont include spaces please");
  }
});

//GET BY ID
express.get("/getById", (req, res) => {
  console.log(req.params);
  const sAdminId = req.params.id;
  const foundSAdmin = sAdmins.find(
    (sAdmins) => sAdmins.id.toString() === sAdminId
  );
  if (foundSAdmin) {
    response.send(foundSAdmin);
  } else {
    res.send("Admin invalid");
  }
});

//POST

express.post("/post", (Req, resp) => {
  const newSAdmin = req.body;
  sAdmins.push(newSAdmin);
  fs.writefile(
    "..src/data/super-admins.json",
    JSON.stringify(sAdmins),
    (error) => {
      if (error) {
        res.send("Admin cant be created");
      } else {
        res.send("Admin created");
      }
    }
  );
  res.send(sAdmins);
});

//DELETE

express.delete("/:id", (req, resp) => {
  const sAdminsId = req.param.id;
  const filteredsAdmins = sAdmins.filter(
    (person) => person.id.toString() !== sAdmins.id
  );
  fs.writefile(
    "..src/data/super-admins.json",
    JSON.stringify(filteredsAdmins),
    (error) => {
      if (error) {
        res.send("Admin cant be delete");
      } else {
        res.send("Admin delete");
      }
    }
  );
  res.send(sAdmins);
});
