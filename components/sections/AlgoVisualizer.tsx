import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw, BarChart3 } from 'lucide-react';

const ARRAY_SIZE = 20;
const MIN_VAL = 5;
const MAX_VAL = 100;
const DELAY_MS = 100;

export const AlgoVisualizer: React.FC = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [compareIndex, setCompareIndex] = useState<number | null>(null);
  const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set());
  
  // Refs to control the loop without closure staleness
  const sortingRef = useRef(false);
  const arrayRef = useRef<number[]>([]);

  // Initialize array
  const resetArray = useCallback(() => {
    const newArr = Array.from({ length: ARRAY_SIZE }, () => 
      Math.floor(Math.random() * (MAX_VAL - MIN_VAL + 1) + MIN_VAL)
    );
    setArray(newArr);
    arrayRef.current = newArr;
    setSortedIndices(new Set());
    setCurrentIndex(null);
    setCompareIndex(null);
    setIsSorting(false);
    sortingRef.current = false;
  }, []);

  useEffect(() => {
    resetArray();
  }, [resetArray]);

  // Bubble Sort Step
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runBubbleSort = async () => {
    if (sortingRef.current) return;
    sortingRef.current = true;
    setIsSorting(true);

    const arr = [...arrayRef.current];
    const n = arr.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (!sortingRef.current) {
                setIsSorting(false);
                return; 
            }

            // Visualize comparison
            setCurrentIndex(j);
            setCompareIndex(j + 1);
            await sleep(DELAY_MS);

            if (arr[j] > arr[j + 1]) {
                // Swap
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                
                // Update state for render
                setArray([...arr]);
                arrayRef.current = [...arr];
                swapped = true;
            }
        }
        
        // Mark end element as sorted
        setSortedIndices(prev => new Set(prev).add(n - i - 1));
        
        if (!swapped) {
            // If no swaps, remaining are sorted
            const remaining = new Set(sortedIndices);
            for(let k=0; k < n-i-1; k++) remaining.add(k);
            setSortedIndices(remaining);
            break;
        }
    }
    
    // Finish up remaining
    setSortedIndices(new Set(arr.map((_, i) => i)));
    setCurrentIndex(null);
    setCompareIndex(null);
    setIsSorting(false);
    sortingRef.current = false;
  };

  const stopSort = () => {
    sortingRef.current = false;
    setIsSorting(false);
  };

  return (
    <div className="bg-retro-surface/50 border border-retro-border p-6 rounded-sm max-w-2xl relative group">
      {/* Decorative Widget Label */}
      <div className="absolute top-0 right-0 bg-retro-border/20 px-2 py-1 text-[9px] font-mono text-retro-dim tracking-widest">
         WIDGET_ID: SORT_01
      </div>

      <header className="flex justify-between items-end mb-4">
        <div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-retro-dark">Bubble_Sort</h3>
            <p className="text-retro-dim text-[10px] font-mono leading-none">Visualization Module</p>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={isSorting ? stopSort : runBubbleSort}
                disabled={sortedIndices.size === ARRAY_SIZE && !isSorting}
                className={`
                    w-8 h-8 flex items-center justify-center border transition-all
                    ${isSorting 
                        ? 'border-retro-accent text-retro-accent bg-retro-accent/5' 
                        : 'border-retro-dim text-retro-dim hover:border-retro-dark hover:text-retro-dark bg-white'}
                `}
                title={isSorting ? "Halt" : "Execute"}
            >
                {isSorting ? <Pause size={12}/> : <Play size={12}/>}
            </button>
            <button 
                onClick={resetArray}
                className="w-8 h-8 flex items-center justify-center border border-retro-dim text-retro-dim hover:text-retro-dark hover:border-retro-dark bg-white transition-all"
                title="Reset"
            >
                <RotateCcw size={12} />
            </button>
        </div>
      </header>

      {/* Compact Monitor */}
      <div className="bg-retro-dark p-2 rounded-sm shadow-inner relative mb-3">
        {/* Screen Glare */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
        
        {/* The Display */}
        <div className="bg-[#1a1a1a] h-32 w-full relative border border-gray-700/50 p-2 flex items-end justify-between gap-px overflow-hidden">
            {array.map((val, idx) => {
                let colorClass = 'bg-retro-primary'; 
                if (sortedIndices.has(idx)) colorClass = 'bg-green-500'; 
                else if (idx === currentIndex || idx === compareIndex) colorClass = 'bg-retro-accent'; 

                return (
                    <div 
                        key={idx}
                        className={`w-full transition-all duration-100 ease-in-out relative ${colorClass}`}
                        style={{ height: `${val}%` }}
                    />
                );
            })}
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono text-retro-dim">
        <div className="flex gap-4">
            <span>N={ARRAY_SIZE}</span>
            <span>CMP: {currentIndex !== null ? `[${currentIndex}] vs [${compareIndex}]` : 'IDLE'}</span>
        </div>
        <div className="flex items-center gap-1">
             <BarChart3 size={10} />
             <span>STATUS: {isSorting ? 'ACTIVE' : 'READY'}</span>
        </div>
      </div>
    </div>
  );
};