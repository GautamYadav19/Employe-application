const express = require("express");
const { async } = require("rxjs");
// const { async } = require("rxjs");
const db = require("../db");
const router = express.Router();

router.post("/login", async function (req, res, next) {
  try {
    let { username, password } = req.body;
    let results = await db.login(username, password);
    res.json(results);
  } catch (error) {
    res, send({ status: 0, error: error });
  }
});
router.post("/register", async (req, res, next) => {
  try {
    console.log();
    let results = await db.registeration(req.body);
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
router.get("/employeelist", async (req, res, next) => {
  try {
    let results = await db.emplopyeelist();
    res.json(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
router.delete("/employeedelete/:id", async (req, res, next) => {
  try {
    let result = await db.employeedelete(req.params.id);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
router.put("/employeeupdate", async (req, res, next) => {
  try {
    let result = await db.employeeupdate(req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
router.get("/employee/:id", async (req, res, next) => {
  try {
    let result = await db.employeebyid(req.params.id);
    res.json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
router.get("/employeesmgr", async (req, res, next) => {
  try {
    let result = await db.employeesmrg();
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
});
router.get("/employeesjobs", async (req, res, next) => {
  try {
    let result = await db.employeejobs();
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
});
router.post("/employeeinsert", async (req, res, next) => {
  try {
    let result = await db.employeeinsert(req.body);
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
});
router.post("/insertdepartment", async (req, res, next) => {
  try {
    let result = await db.insertDepartment(req.body);
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
});
router.get("/departments", async (req, res, next) => {
  try {
    let result = await db.departmentlist();
    res.json(result);
  } catch (err) {
    res.sendStatus(500);
    console.log(err);
  }
});
router.delete("/departmentdelete/:id", async (req, res, next) => {
  try {
    // console.log(req);
    let results = await db.departmentdelete(req.params.id);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendstatus(500);
  }
});
router.put("/departmentupdate", async (req, res, next) => {
  try {
    let results = await db.departmentupdate(req.body);
    res.json(results);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
router.get("/department/:id", async (req, res, next) => {
  try {
    let result = await db.departmentById(req.params.id);
    res.json(result);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});
router.get("/location", async (req, res, next) => {
  try {
    let result = await db.location();
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
});
module.exports = router;
