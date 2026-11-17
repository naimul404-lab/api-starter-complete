export type User = {
  id: number;
  name: string;
  email: string;
  active: boolean;
};

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', active: true },
  { id: 2, name: 'Bob', email: 'bob@example.com', active: false },
];

export function findAllUsers(): User[] {
  return users;
}

export function findUserById(id: number): User | undefined {
  return users.find((user) => user.id === id);
}

export function createUser(input: Omit<User, 'id'>): User {
  const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const user: User = { id: nextId, ...input };
  users.push(user);
  return user;
}

export function updateUserById(id: number, updates: Partial<Omit<User, 'id'>>): User | undefined {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return undefined;

  users[index] = {
    ...users[index],
    ...updates,
  };

  return users[index];
}

export function deleteUserById(id: number): User | undefined {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) return undefined;

  const [deletedUser] = users.splice(index, 1);
  return deletedUser;
}
