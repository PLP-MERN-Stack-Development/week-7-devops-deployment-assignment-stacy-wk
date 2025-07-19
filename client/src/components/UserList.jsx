const UserList = ({ users, onSelect }) => {
  return (
    <div className="w-1/4 bg-gray-300 p-4 text-black space-y-2">
      <h2 className="text-lg font-bold">Online Users</h2>
      {users.map((u) => (
        <div key={u.id} className="cursor-pointer hover:text-blue-300" onClick={() => onSelect(u)}>
          {u.username}
        </div>
      ))}
    </div>
  );
};

export default UserList;
