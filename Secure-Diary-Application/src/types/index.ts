export interface User {
  username: string;
  passwordHash: string;
}

export interface Entry {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export interface EntryFormData {
  title: string;
  content: string;
  tags: string;
}
