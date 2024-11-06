import { format } from "date-fns";
import { Entry } from "../types";
import { Tag, Calendar, Edit2 } from "lucide-react";

interface EntryListProps {
  entries: Entry[];
  onEdit: (entry: Entry) => void;
}

export default function EntryList({ entries, onEdit }: EntryListProps) {
  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-800">
              {entry.title}
            </h3>
            <button
              onClick={() => onEdit(entry)}
              className="text-gray-400 hover:text-purple-600 transition-colors"
            >
              <Edit2 className="h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-600 mb-4">{entry.content}</p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(entry.createdAt), "PPP")}</span>
            </div>
            {entry.tags.length > 0 && (
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4" />
                <div className="flex gap-2">
                  {entry.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      {entries.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No entries yet. Start writing your first entry!
        </div>
      )}
    </div>
  );
}
