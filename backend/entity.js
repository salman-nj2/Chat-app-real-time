let users = [];

const addUser = ({ id, user, room }) => {
  user = user.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!user || !room) {
    return { error: "name and room required" };
  }

  if (users.length) {
    const data = users.find((e) => e.user === user && e.room === room);

    if (data) {
      return { error: "user already exist" };
    }
  }

  const response = { id, user, room };

  users.push(response);

  console.log(users);

  return { response };
};

const removeUser = (id) => {
  const findIdx = users.findIndex((user) => user.id === id);
  if (findIdx) {
    return users.splice(findIdx, 1)[0];
  }
};
const getUser = (id) => {
  return users.find((user) => user.id === id);
};
const activeUsers = (room) => {
  return users.filter((user) => user.room === room);
};
console.log(users);
module.exports = {
  addUser,
  getUser,
  removeUser,
  activeUsers,
};
