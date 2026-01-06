import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editTask, setEditTask] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  const createTask = async () => {
    if (!title.trim()) return;
    try {
      setLoading(true);
      await api.post("/tasks", { title });
      setTitle("");
      fetchTasks();
    } catch {
      setError("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  // TOGGLE COMPLETE
  const toggleComplete = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        completed: !task.completed
      });
      fetchTasks();
    } catch {
      setError("Failed to update task");
    }
  };

  // UPDATE
  const updateTask = async () => {
    try {
      await api.put(`/tasks/${editTask._id}`, {
        title: editTask.title
      });
      setEditTask(null);
      fetchTasks();
    } catch {
      setError("Failed to update task");
    }
  };

  // DELETE
  const deleteTask = async () => {
    try {
      await api.delete(`/tasks/${deleteId}`);
      setDeleteId(null);
      fetchTasks();
    } catch {
      setError("Failed to delete task");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // STATS
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Task Dashboard
            </h1>
            <p className="text-slate-500 text-sm">
              Manage your tasks efficiently
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Total Tasks" value={total} color="indigo" />
          <StatCard label="Completed" value={completed} color="green" />
          <StatCard label="Pending" value={pending} color="orange" />
        </div>

       
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}

        {/* ADD TASK */}
        <div className="bg-white p-6 rounded-xl shadow flex gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What do you need to do?"
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={createTask}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Add Task
          </button>
        </div>

       
        <div className="bg-white rounded-xl shadow divide-y">
          {loading ? (
            <p className="p-6 text-slate-500">Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p className="p-6 text-slate-500 text-center">
              No tasks added yet
            </p>
          ) : (
            tasks.map(task => (
              <div
                key={task._id}
                className="p-4 flex justify-between items-center hover:bg-slate-50"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                    className="w-5 h-5 accent-indigo-600"
                  />
                  <span
                    className={`text-slate-700 ${
                      task.completed
                        ? "line-through text-gray-400"
                        : ""
                    }`}
                  >
                    {task.title}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditTask(task)}
                    className="px-3 py-1 text-sm bg-yellow-400 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteId(task._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      
      {editTask && (
        <Modal>
          <h3 className="text-lg font-semibold mb-4">Edit Task</h3>
          <input
            value={editTask.title}
            onChange={(e) =>
              setEditTask({ ...editTask, title: e.target.value })
            }
            className="w-full px-4 py-2 border rounded mb-4"
          />
          <ModalActions
            onCancel={() => setEditTask(null)}
            onConfirm={updateTask}
            confirmText="Save"
          />
        </Modal>
      )}

      {deleteId && (
        <Modal>
          <p className="mb-4">
            Are you sure you want to delete this task?
          </p>
          <ModalActions
            onCancel={() => setDeleteId(null)}
            onConfirm={deleteTask}
            confirmText="Delete"
            danger
          />
        </Modal>
      )}
    </div>
  );
}


function StatCard({ label, value, color }) {
  const colors = {
    indigo: "bg-indigo-100 text-indigo-700",
    green: "bg-green-100 text-green-700",
    orange: "bg-orange-100 text-orange-700"
  };

  return (
    <div className={`p-4 rounded-xl shadow ${colors[color]}`}>
      <p className="text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function Modal({ children }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">
        {children}
      </div>
    </div>
  );
}

function ModalActions({ onCancel, onConfirm, confirmText, danger }) {
  return (
    <div className="flex justify-end gap-3">
      <button
        onClick={onCancel}
        className="px-4 py-1 border rounded"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className={`px-4 py-1 rounded text-white ${
          danger
            ? "bg-red-500 hover:bg-red-600"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {confirmText}
      </button>
    </div>
  );
}
