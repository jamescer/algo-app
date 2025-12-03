import React, { useState } from 'react';
import './Sort.css';

/**
 *
 * @returns Quick Sort: This algorithm is known for its average-case efficiency, typically achieving O(n log n) time complexity. It employs a divide-and-conquer strategy, selecting a 'pivot' element and partitioning the other elements into two sub-arrays based on whether they are less than or greater than the pivot. While generally fast, its worst-case scenario can degrade to O(n²).
 * Merge Sort: Another divide-and-conquer algorithm, Merge Sort consistently provides O(n log n) time complexity in all cases (best, average, and worst). It works by recursively dividing the list into halves until individual elements are reached, then merging these sorted sub-lists back together. It requires O(n) auxiliary space.
 * Heap Sort: This algorithm is an efficient, in-place comparison-based sorting algorithm with a time complexity of O(n log n) in all cases. It utilizes a binary heap data structure, building a max-heap from the input data and then repeatedly extracting the maximum element and rebuilding the heap.
 * Insertion Sort: Simple to implement, Insertion Sort has a best-case time complexity of O(n) when the list is already sorted, but its average and worst cases are O(n²). It works by iterating through the list, taking each element and inserting it into its correct position within the already sorted portion of the array. It is particularly efficient for small datasets or nearly sorted data.
 * Selection Sort: Similar in simplicity to Insertion Sort, Selection Sort also has a time complexity of O(n²) across all cases. It works by repeatedly finding the minimum element from the unsorted part of the array and putting it at the beginning. While straightforward, its performance makes it less suitable for large datasets.
 */

const SortComponent = () => {
  const [arraySize, setArraySize] = useState(100);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [sortType, setSortType] = useState('quicksort');
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [comparingIndices, setComparingIndices] = useState(new Set());
  const [sortedIndices, setSortedIndices] = useState(new Set());
  const [swappedIndices, setSwappedIndices] = useState(new Set());
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0 });

  const generateArray = () => {
    const newArray = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
      );
    }
    setArray(newArray);
    setComparingIndices(new Set());
    setSortedIndices(new Set());
    setSwappedIndices(new Set());
    setStats({ comparisons: 0, swaps: 0 });
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const quickSort = async () => {
    setIsSorting(true);
    let comparisons = 0;
    let swaps = 0;
    const arr = [...array];

    const partition = async (low, high) => {
      const pivot = arr[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        comparisons++;
        setComparingIndices(new Set([i, j]));
        setStats({ comparisons, swaps });
        await sleep(9);

        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swaps++;
          setArray([...arr]);
          setSwappedIndices(new Set([i, j]));
          setStats({ comparisons, swaps });
          await sleep(9);
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      swaps++;
      setArray([...arr]);
      setSwappedIndices(new Set([i + 1, high]));
      setStats({ comparisons, swaps });
      await sleep(9);
      return i + 1;
    };

    const sort = async (low, high) => {
      if (low < high) {
        const pi = await partition(low, high);
        await sort(low, pi - 1);
        await sort(pi + 1, high);
      } else if (low === high) {
        setSortedIndices((prev) => new Set([...prev, low]));
      }
    };

    await sort(0, arr.length - 1);
    setSortedIndices(new Set([...Array(arr.length).keys()]));
    setComparingIndices(new Set());
    setSwappedIndices(new Set());
    setIsSorting(false);
  };

  const mergeSort = async () => {
    setIsSorting(true);
    let comparisons = 0;
    let swaps = 0;
    const arr = [...array];

    const merge = async (left, mid, right) => {
      const leftArr = arr.slice(left, mid + 1);
      const rightArr = arr.slice(mid + 1, right + 1);
      let i = 0,
        j = 0,
        k = left;

      while (i < leftArr.length && j < rightArr.length) {
        comparisons++;
        setComparingIndices(new Set([left + i, mid + 1 + j]));
        setStats({ comparisons, swaps });
        await sleep(9);

        if (leftArr[i] <= rightArr[j]) {
          arr[k] = leftArr[i];
          i++;
        } else {
          arr[k] = rightArr[j];
          j++;
        }
        swaps++;
        setArray([...arr]);
        setSwappedIndices(new Set([k]));
        setStats({ comparisons, swaps });
        k++;
      }

      while (i < leftArr.length) {
        arr[k] = leftArr[i];
        swaps++;
        setArray([...arr]);
        i++;
        k++;
      }

      while (j < rightArr.length) {
        arr[k] = rightArr[j];
        swaps++;
        setArray([...arr]);
        j++;
        k++;
      }
    };

    const sort = async (left, right) => {
      if (left < right) {
        const mid = Math.floor((left + right) / 2);
        await sort(left, mid);
        await sort(mid + 1, right);
        await merge(left, mid, right);
      } else if (left === right) {
        setSortedIndices((prev) => new Set([...prev, left]));
      }
    };

    await sort(0, arr.length - 1);
    setSortedIndices(new Set([...Array(arr.length).keys()]));
    setComparingIndices(new Set());
    setSwappedIndices(new Set());
    setIsSorting(false);
  };

  const insertionSort = async () => {
    setIsSorting(true);
    let comparisons = 0;
    let swaps = 0;
    const arr = [...array];

    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;

      while (j >= 0) {
        comparisons++;
        setComparingIndices(new Set([j, i]));
        setStats({ comparisons, swaps });
        await sleep(9);

        if (arr[j] > key) {
          arr[j + 1] = arr[j];
          swaps++;
          setArray([...arr]);
          setSwappedIndices(new Set([j + 1]));
          setStats({ comparisons, swaps });
          j--;
        } else {
          break;
        }
      }

      arr[j + 1] = key;
      swaps++;
      setArray([...arr]);
      setSortedIndices((prev) => new Set([...prev, j + 1]));
      setStats({ comparisons, swaps });
    }

    setSortedIndices(new Set([...Array(arr.length).keys()]));
    setComparingIndices(new Set());
    setSwappedIndices(new Set());
    setIsSorting(false);
  };

  const selectionSort = async () => {
    setIsSorting(true);
    let comparisons = 0;
    let swaps = 0;
    const arr = [...array];

    for (let i = 0; i < arr.length - 1; i++) {
      let minIdx = i;

      for (let j = i + 1; j < arr.length; j++) {
        comparisons++;
        setComparingIndices(new Set([minIdx, j]));
        setStats({ comparisons, swaps });
        await sleep(30);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        swaps++;
        setArray([...arr]);
        setSwappedIndices(new Set([i, minIdx]));
        setStats({ comparisons, swaps });
        await sleep(9);
      }

      setSortedIndices((prev) => new Set([...prev, i]));
    }

    setSortedIndices(new Set([...Array(arr.length).keys()]));
    setComparingIndices(new Set());
    setSwappedIndices(new Set());
    setIsSorting(false);
  };

  const runSort = () => {
    if (array.length === 0) {
      alert('Please generate an array first!');
      return;
    }

    if (sortType === 'quicksort') {
      quickSort();
    } else if (sortType === 'mergesort') {
      mergeSort();
    } else if (sortType === 'insertionsort') {
      insertionSort();
    } else if (sortType === 'selectionsort') {
      selectionSort();
    }
  };

  const getBarClass = (index) => {
    if (sortedIndices.has(index)) return 'bar bar-sorted';
    if (comparingIndices.has(index)) return 'bar bar-comparing';
    if (swappedIndices.has(index)) return 'bar bar-swapped';
    return 'bar bar-default';
  };

  return (
    <div className="sort-container">
      <h1>Sort Component</h1>

      <div className="controls">
        <div className="control-group">
          <label htmlFor="array-size">Array Size:</label>
          <input
            id="array-size"
            type="number"
            min="10"
            max="200"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            disabled={isSorting}
          />
        </div>

        <div className="control-group">
          <label htmlFor="min-value">Min Value:</label>
          <input
            id="min-value"
            type="number"
            value={minValue}
            onChange={(e) => setMinValue(Number(e.target.value))}
            disabled={isSorting}
          />
        </div>

        <div className="control-group">
          <label htmlFor="max-value">Max Value:</label>
          <input
            id="max-value"
            type="number"
            value={maxValue}
            onChange={(e) => setMaxValue(Number(e.target.value))}
            disabled={isSorting}
          />
        </div>

        <div className="control-group">
          <label htmlFor="sort-type">Sort Type:</label>
          <select
            id="sort-type"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            disabled={isSorting}
          >
            <option value="quicksort">Quick Sort</option>
            <option value="mergesort">Merge Sort</option>
            <option value="insertionsort">Insertion Sort</option>
            <option value="selectionsort">Selection Sort</option>
          </select>
        </div>

        <button
          onClick={generateArray}
          className="btn-generate"
          disabled={isSorting}
        >
          Generate Array
        </button>

        <button
          onClick={runSort}
          className="btn-sort"
          disabled={isSorting || array.length === 0}
        >
          {isSorting ? 'Sorting...' : 'Start Sort'}
        </button>
      </div>

      {array.length > 0 && (
        <div className="sort-info">
          <p>Sort Type: {sortType.toUpperCase()}</p>
          <p>Array Size: {arraySize}</p>
          <p>
            Comparisons: {stats.comparisons} | Swaps: {stats.swaps}
          </p>
        </div>
      )}

      <div className="bars-wrapper">
        {array.length > 0 ? (
          <div className="bars-container">
            {array.map((value, index) => (
              <div
                key={index}
                className={getBarClass(index)}
                style={{
                  height: `${(value / maxValue) * 100}%`,
                }}
                title={value}
              />
            ))}
          </div>
        ) : (
          <p className="placeholder">Click "Generate Array" to start</p>
        )}
      </div>
    </div>
  );
};

export default SortComponent;
