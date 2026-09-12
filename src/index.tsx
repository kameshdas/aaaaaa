import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

function App() {
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const [history, setHistory] = useState<number[]>([]);

  const increment = () => {
    const newCount = count + step;
    setHistory([count, ...history.slice(0, 9)]);
    setCount(newCount);
  };

  const decrement = () => {
    const newCount = count - step;
    setHistory([count, ...history.slice(0, 9)]);
    setCount(newCount);
  };

  const reset = () => {
    setHistory([count, ...history.slice(0, 9)]);
    setCount(0);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 font-bold text-2xl mb-6 shadow-inner">
          #
        </div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Interactive Counter</h1>
        <p className="text-slate-500 text-sm mb-8">Track your numbers easily with custom step increments.</p>

        <div className="my-6">
          <span className={`text-7xl font-extrabold tracking-tight transition-all duration-200 inline-block ${count > 0 ? 'text-emerald-600' : count < 0 ? 'text-rose-600' : 'text-slate-800'}`}>
            {count}
          </span>
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={decrement}
            className="flex-1 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-semibold py-3 px-6 rounded-xl transition-all duration-150 shadow-sm"
          >
            -{step}
          </button>
          <button
            onClick={increment}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-150 shadow-md shadow-indigo-200"
          >
            +{step}
          </button>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between text-sm">
            <label htmlFor="step-input" className="font-medium text-slate-600">Step Increment:</label>
            <input
              id="step-input"
              type="number"
              min="1"
              value={step}
              onChange={(e) => setStep(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 px-3 py-1.5 text-center border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-medium"
            />
          </div>

          <button
            onClick={reset}
            className="w-full py-2.5 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
          >
            Reset Counter
          </button>
        </div>

        {history.length > 0 && (
          <div className="mt-6 pt-4 border-t border-slate-100 text-left">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">Recent History</span>
            <div className="flex flex-wrap gap-1.5">
              {history.map((val, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md font-mono">
                  {val}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
