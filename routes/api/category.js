module.exports = server => {
  const assert = require("http-assert");
  const jwt = require("jsonwebtoken");

  const router = require("express").Router({
    mergeParams: true
  });
  server.use(
    "/api/rest/:resoure",
    async (req, res, next) => {
      assert(req.headers.authorization, 401, "请先登录");
      const token = String(req.headers.authorization)
        .split(" ")
        .pop();
      assert(token, 401, "请先登录");
      const id = jwt.verify(token, require("../../token/index").socret);
      assert(id, 401, "请先登录");
      req.admin = require("../../models/admin").findById(id);
      assert(req.admin, 401, "请先登录");
      await next();
    },
    (req, res, next) => {
      modelName = req.params.resoure;
      req.Model = require(`../../models/${modelName}`);
      next();
    },
    router
  );

  router.post("/", async (req, res) => {
    const result = await req.Model.create(req.body);
    res.json(result);
  });
  router.get(
    "/",

    async (req, res) => {
      let queryOpations = {};
      if (req.Model.modelName === "category") {
        queryOpations.populate = "parent";
      }
      const result = await req.Model.find()
        .setOptions(queryOpations)
        .limit(100);
      res.json(result);
    }
  );
  router.get("/:id", async (req, res) => {
    const result = await req.Model.findById(req.params.id);
    res.json(result);
  });
  router.post("/:id", async (req, res) => {
    const result = await req.Model.findOneAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.json(result);
  });
  router.delete("/:id", async (req, res) => {
    const result = await req.Model.findOneAndDelete({ _id: req.params.id });
    res.json(result);
  });

  //登录
  server.post("/api/login", async (req, res) => {
    const { userName, password = " " } = req.body;
    console.log(userName, password);

    const Admin = await require("../../models/admin");
    const result = await Admin.findOne({ userName }).select("+password");
    assert(result, 422, "用户名不存在");
    const isOk = require("bcrypt").compareSync(password, result.password);
    assert(isOk, 422, "密码错误");

    const token = jwt.sign(
      {
        id: result._id
      },
      require("../../token/index").socret
    );
    res.json(token);
  });
  // 错误处理
  server.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    });
  });
};
