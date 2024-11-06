import { encrypt, decrypt } from "./encrytion.ts";
import { User, Entry } from "../types/index.ts";

const USERS_KEY = "diary_users";
const ENTRIES_KEY = "diary_entries";
const CURRENT_USER_KEY = "diary_current_user";

export const saveUser = (user: User): void => {
  const users = getUsers();
  users[user.username] = user;
  localStorage.setItem(USERS_KEY, encrypt(JSON.stringify(users)));
};

export const getUsers = (): Record<string, User> => {
  const encrypted = localStorage.getItem(USERS_KEY);
  if (!encrypted) return {};
  return JSON.parse(decrypt(encrypted));
};

export const saveEntry = (entry: Entry): void => {
  const currentUser = getCurrentUser();
  if (!currentUser) return;

  const key = `${ENTRIES_KEY}_${currentUser.username}`;
  const entries = getEntries();
  const existingIndex = entries.findIndex((e) => e.id === entry.id);

  if (existingIndex >= 0) {
    entries[existingIndex] = entry;
  } else {
    entries.push(entry);
  }

  localStorage.setItem(key, encrypt(JSON.stringify(entries)));
};

export const getEntries = (): Entry[] => {
  const currentUser = getCurrentUser();
  if (!currentUser) return [];

  const key = `${ENTRIES_KEY}_${currentUser.username}`;
  const encrypted = localStorage.getItem(key);
  if (!encrypted) return [];
  return JSON.parse(decrypt(encrypted));
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, encrypt(JSON.stringify(user)));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

export const getCurrentUser = (): User | null => {
  const encrypted = localStorage.getItem(CURRENT_USER_KEY);
  if (!encrypted) return null;
  return JSON.parse(decrypt(encrypted));
};
