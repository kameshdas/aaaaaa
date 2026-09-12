import React, { useState, useEffect } from 'react';

interface HistoryItem {
  id: string;
  action: string;
  value: number;
  timestamp: string;
}

export default function App() {
  const [count, setCount] = useState<number>(() => {
    const saved = localStorage.getItem('count_app_value');
    return saved !== null ? Number(saved) : 0;
  });
  const [step, setStep] = useState<number>(1);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('count_app_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [maxCount, setMaxCount] = useState<number>(() => {
    const saved = localStorage.getItem('count_app_max');
    return saved !== null ? Number(saved) : count;
  });

  useEffect(() => {
    localStorage.setItem('count_app_value', count.toString());
    if (count > maxCount) {
      setMaxCount(count);
      localStorage.setItem('count_app_max', count.toString());
    }
  }, [count, maxCount]);

  useEffect(() => {
    localStorage.setItem('count_app_history', JSON.stringify(history));
  }, [history]);

  const addHistory = (action: string, newVal: number) => {
    const newItem: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      action,
      value: newVal,
      timestamp: new Date().toLocaleTimeString(),
    };
    setHistory(prev => [newItem, ...prev.slice(0, 19)]);
  };

  const increment = () => {
    const newVal = count + step;
    setCount(newVal);
    addHistory(`Incremented (+${step})`, newVal);
  };

  const decrement = () => {
    const newVal = count - step;
    setCount(newVal);
    addHistory(`Decremented (-${step})`, newVal);
  };

  const reset = () => {
    setCount(0);
    addHistory('Reset to 0', 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col gap-6">
        
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Advanced Counter
          </h1>
          <p className="text-sm text-slate-400 mt-1">Keep track of your counts effortlessly</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-3 text-center">
            <span className="text-xs text-slate-400 block font-medium">Max Reached</span>
            <span className="text-lg font-bold text-purple-300">{maxCount}</span>
          </div>
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-3 text-center">
            <span className="text-xs text-slate-400 block font-medium">History logs</span>
            <span className="text-lg font-bold text-pink-300">{history.length}</span>
          </div>
        </div>

        {/* Main Display */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-2xl py-8 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
          <span className={`text-6xl md:text-7xl font-black tracking-tighter transition-transform duration-200 ${count > 0 ? 'text-emerald-400' : count < 0 ? 'text-rose-400' : 'text-slate-100'}`}>
            {count}
          </span>
        </div>

        {/* Step Control */}
        <div className="flex items-center justify-between bg-slate-800/40 border border-slate-700/40 rounded-xl px-4 py-3">
          <span className="text-sm font-medium text-slate-300">Step Increment</span>
          <div className="flex gap-1.5">
            {[1, 5, 10, 25].map(s => (
              <button
                key={s}
                onClick={() => setStep(s)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  step === s
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={decrement}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold shadow-lg shadow-rose-600/25 active:scale-95 transition-all"
          >
            <span>-{step}</span>
          </button>
          <button
            onClick={increment}
            className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-lg shadow-emerald-600/25 active:scale-95 transition-all"
          >
            <span>+{step}</span>
          </button>
        </div>

        {/* Reset Button */}
        <button
          onClick={reset}
          className="w-full py-2.5 rounded-xl border border-slate-700/80 bg-slate-800/50 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-sm transition-all active:scale-98"
        >
          Reset Counter
        </button>

        {/* History Log */}
        {history.length > 0 && (
          <div className="mt-2 border-t border-slate-800 pt-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Recent Activity</h2>
              <button
                onClick={() => setHistory([])}
                className="text-xs text-purple-400 hover:text-purple-300 font-medium"
              >
                Clear log
              </button>
            </div>
            <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 custom-scrollbar">
              {history.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-slate-950/40 border border-slate-800/60 rounded-xl px-3 py-2 text-xs">
                  <span className="text-slate-300 font-medium">{item.action}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 text-[10px]">{item.timestamp}</span>
                    <span className="font-bold text-purple-300 bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-800/40">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
