import User from "../models/User.js";

export const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const search = req.query.search || "";
  
  const query = search ? { name: new RegExp(search, "i") } : {};

  try {
    const users = await User.find(query)
      .sort({ _id: 1 }) 
      .skip((page - 1) * limit)
      .limit(limit);

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

export const updateUser = async (req, res) => {
  try {
    console.log("🔹 ID пользователя:", req.params.id);
    console.log("🔹 Данные для обновления:", req.body);

    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, 
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    console.log("✅ Обновленный пользователь:", updatedUser);
    res.json(updatedUser);
  } catch (err) {
    console.error("❌ Ошибка при обновлении:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
