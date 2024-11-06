import React, { useState, useEffect } from "react";
import { saveEntry } from "../utils/storage";
import { Entry, EntryFormData } from "../types";
import { X } from "lucide-react";

interface EntryFormProps {
  onSave: () => void;
  entry?: Entry;
  onCancel?: () => void;
}

export default function EntryForm({ onSave, entry, onCancel }: EntryFormProps) {
  const [formData, setFormData] = useState<EntryFormData>({
    title: "",
    content: "",
    tags: "",
  });

  useEffect(() => {
    if (entry) {
      setFormData({
        title: entry.title,
        content: entry.content,
        tags: entry.tags.join(", "),
      });
    }
  }, [entry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Entry = {
      id: entry?.id || Date.now().toString(),
      title: formData.title,
      content: formData.content,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      createdAt: entry?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveEntry(newEntry);
    setFormData({ title: "", content: "", tags: "" });
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {entry ? "Edit Entry" : "New Entry"}
        </h2>
        {entry && (
          <button
            type="button"
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      <div>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Entry Title"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      <div>
        <textarea
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          placeholder="Write your thoughts..."
          className="w-full h-40 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      <div>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="Tags (comma-separated)"
          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 bg-purple-600 text-white rounded-lg px-4 py-2 hover:bg-purple-700 transition-colors"
        >
          {entry ? "Save Changes" : "Save Entry"}
        </button>
        {entry && (
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-100 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
