const prisma = require("../config/db");

async function getPublicSetting(req, res) {
  const { key } = req.params;
  const setting = await prisma.setting.findUnique({ where: { key } });
  res.json({ key, value: setting?.value ?? null });
}

module.exports = { getPublicSetting };