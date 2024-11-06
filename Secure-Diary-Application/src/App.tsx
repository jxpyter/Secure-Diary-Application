import { useState, useEffect } from "react";
import { getCurrentUser, getEntries, setCurrentUser } from "./utils/storage.ts";
import AuthForm from "./components/AuthForm.tsx";
import EntryForm from "./components/EntryForm.tsx";
import EntryList from "./components/EntryList.tsx";
import { LogOut, BookOpen } from "lucide-react";
import { Entry } from "./types/index.ts";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [editingEntry, setEditingEntry] = useState<Entry | undefined>();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
      setEntries(getEntries());
    }
  }, []);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setEntries(getEntries());
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setEntries([]);
  };

  const handleEntrySave = () => {
    setEntries(getEntries());
    setEditingEntry(undefined);
  };

  const handleEdit = (entry: Entry) => {
    setEditingEntry(entry);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isAuthenticated) {
    return <AuthForm onSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">My Diary</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <EntryForm
              onSave={handleEntrySave}
              entry={editingEntry}
              onCancel={() => setEditingEntry(undefined)}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Your Entries
            </h2>
            <EntryList entries={entries} onEdit={handleEdit} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
