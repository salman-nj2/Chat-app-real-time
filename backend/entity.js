let users = [];

const addUser = ({ id, name, room }) => {
  if (!name || !room) {
    return { error: "name and room is required" };
  }

  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (users.length) {
    const existingUser = users.find(
      (each) => each.name === name && each.room === room
    );
    if (existingUser) {
      return { error: "user already exists" };
    }
  }

  const user = { id, name, room };

  users.push(user);
  return { user };
};
module.exports = {
  addUser,
};
