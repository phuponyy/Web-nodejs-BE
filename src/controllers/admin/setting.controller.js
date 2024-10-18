const SettingGenaral = require("../../models/setting-genaral.modal");

module.exports.index = async (req, res) => {
  const settingGenaral = await SettingGenaral.findOne({});
  res.render("admin/pages/setting/genaral", {
    pageTitle: "Cài đặt hệ thống",
    settingGenaral: settingGenaral,
  });
};

//NOTE: [PATCH] /admin/settings/genaral
module.exports.indexPatch = async (req, res) => {
  const settingGenaral = await SettingGenaral.findOne({});
  console.log(req.body);

  if (settingGenaral) {
    await settingGenaral.updateOne(
      {
        _id: settingGenaral.id,
      },
      req.body
    );
  } else {
    const record = new SettingGenaral(req.body);
    await record.save();
  }

  res.redirect("back");
};
