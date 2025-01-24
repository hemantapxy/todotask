import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar, FiClock, FiRepeat } from "react-icons/fi";
import { Star } from 'lucide-react';

export default function MainContent({ tasks, setTasks }) {
  //const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newDueDate, setNewDueDate] = useState(null);
  const [newReminder, setNewReminder] = useState(null);
  const [repeatInterval, setRepeatInterval] = useState("none");
  const [newSubtask, setNewSubtask] = useState({ taskId: null, text: "" });

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        important: false,
        subtasks: [],
        dueDate: newDueDate,
        reminder: newReminder,
        repeat: repeatInterval,
      };
      setTasks([...tasks, task]);
      setNewTask("");
      setNewDueDate(null);
      setNewReminder(null);
      setRepeatInterval("none");
    }
  };

  const toggleCompleted = (taskId) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const toggleImportant = (taskId) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, important: !t.important } : t
      )
    );
  };

  const addSubtask = (taskId) => {
    if (newSubtask.text.trim() && newSubtask.taskId === taskId) {
      setTasks(
        tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                subtasks: [
                  ...task.subtasks,
                  {
                    id: Date.now(),
                    text: newSubtask.text,
                    completed: false,
                  },
                ],
              }
            : task
        )
      );
      setNewSubtask({ taskId: null, text: "" });
    }
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((st) =>
                st.id === subtaskId ? { ...st, completed: !st.completed } : st
              ),
            }
          : task
      )
    );
  };

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <main className="ml-64 p-8 min-h-screen">
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">
          Today's Tasks ({tasks.length})
        </h2>

        <form
          onSubmit={addTask}
          className="mb-6 w-full bg-green p-4 rounded-xl shadow-sm"
        >
          <div className="flex flex-col gap-4">
            <div className="relative">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
                className="w-full p-3 text-lg border-b focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Add Task
              </button>
            </div>

            <div className="flex items-center gap-4 text-gray-500">
              <button
                type="button"
                onClick={() =>
                  document.getElementById("due-date-input").focus()
                }
                className="flex items-center gap-2 hover:bg-gray-800 px-3 py-1 rounded"
              >
                <FiCalendar className="w-5 h-5" />
                <DatePicker
                  id="due-date-input"
                  selected={newDueDate}
                  onChange={(date) => setNewDueDate(date)}
                  dateFormat="MMM d"
                  placeholderText="Due date"
                  className="bg-transparent text-gray-100 w-24 focus:outline-none"
                />
              </button>

              <button
                type="button"
                onClick={() =>
                  document.getElementById("reminder-input").focus()
                }
                className="flex items-center gap-2 hover:bg-gray-800 px-3 py-1 rounded"
              >
                <FiClock className="w-5 h-5" />
                <DatePicker
                  id="reminder-input"
                  selected={newReminder}
                  onChange={(date) => setNewReminder(date)}
                  showTimeSelect
                  dateFormat="h:mm aa"
                  placeholderText="Reminder"
                  className="bg-transparent text-gray-100 w-20 focus:outline-none"
                />
              </button>

              <button
                type="button"
                onClick={() => document.getElementById("repeat-select").focus()}
                className="flex items-center gap-2 hover:bg-gray-800 px-3 py-1 rounded"
              >
                <FiRepeat className="w-5 h-5" />
                <select
                  id="repeat-select"
                  value={repeatInterval}
                  onChange={(e) => setRepeatInterval(e.target.value)}
                  className="bg-transparent text-gray-400 focus:outline-none"
                >
                  <option value="none">Repeat</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </button>
            </div>
          </div>
        </form>
        <div className="space-y-2">
          {activeTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-black rounded-lg shadow-sm border flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompleted(task.id)}
                    className="w-4 h-4"
                  />
                  <span className="font-medium">{task.text}</span>
                </div>
                <div className="flex items-center gap-4">
                  {task.dueDate && (
                    <span className="text-sm text-gray-500">
                      📅{" "}
                      {new Date(task.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  )}
                  {task.reminder && (
                    <span className="text-sm text-gray-500">
                      ⏰ {new Date(task.reminder).toLocaleTimeString(
                        'en-US', {
                        hour: 'numeric',
                        minute: '2-digit'
                      }
                      )}
                    </span>
                  )}
                 <button
  onClick={() => toggleImportant(task.id)}
  className={`p-1 ${
    task.important ? "text-yellow-400" : "text-yellow-400/30"
  } hover:text-yellow-400 transition-colors`}
>
  <Star
    fill={task.important ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-5 h-5"
  />
</button>
                </div>
              </div>

              <div className="ml-8 space-y-2">
                {task.subtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => toggleSubtask(task.id, subtask.id)}
                      className="w-4 h-4"
                    />
                    <span
                      className={
                        subtask.completed ? "line-through text-gray-400" : ""
                      }
                    >
                      {subtask.text}
                    </span>
                  </div>
                ))}

                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newSubtask.taskId === task.id ? newSubtask.text : ""}
                    onChange={(e) =>
                      setNewSubtask({ taskId: task.id, text: e.target.value })
                    }
                    placeholder="Add step"
                    className="flex-1 p-1 border-b focus:outline-none"
                  />
                  <button
                    onClick={() => addSubtask(task.id)}
                    className="px-2 py-1 text-sm bg-black-100 rounded hover:bg-gray-500"
                  >
                    + Add Step
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Completed Tasks Section remains same */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-gray-500 mb-4">
          Completed ({completedTasks.length})
        </h2>
        <div className="space-y-2">
          {completedTasks.map((task) => (
            <div
              key={task.id}
              className="p-3 bg-gray-500 rounded-lg flex items-center gap-4 group hover:bg-gray-3100 transition-colors"
            >
              <input
                type="checkbox"
                checked={true}
                onChange={() => toggleCompleted(task.id)}
                className="w-4 h-4 accent-green-500"
              />
              <span className="text-gray-400 line-through flex-1">
                {task.text}
              </span>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {task.dueDate && (
                  <span className="text-xs text-gray-400">
                    📅 {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
                <button
  onClick={() => toggleImportant(task.id)}
  className={`p-1 ${
    task.important ? "text-yellow-400" : "text-yellow-400/30"
  } hover:text-yellow-400 transition-colors`}
>
  <Star
    fill={task.important ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={1.5}
    className="w-5 h-5"
  />
</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
