const prisma = require("../config/db");

async function getModules(req, res) {
  const modules = await prisma.module.findMany({
    include: { lessons: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  });
  res.json(modules);
}

async function getModule(req, res) {
  const mod = await prisma.module.findUnique({
    where: { id: req.params.id },
    include: { lessons: { orderBy: { order: "asc" } } },
  });
  if (!mod) return res.status(404).json({ error: "Not found" });
  res.json(mod);
}

module.exports = { getModules, getModule };