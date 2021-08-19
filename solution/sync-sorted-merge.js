"use strict";

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  // Pop all LogEntries in logSources in Chronological order
  // Once end of log source return false
  // Print each logEntry using printer.print(logEntry) to check if in chrono order
  // When done call printer.done() for stats on output

  // 1. Merge sort - worst Time Complexity = O(nlogn); space complexity = O(n)
  // 2. Quick sort - worst Time Complexity = O(n^2); spce complexity = O(n) at worst 

  // Using merge sort
  const merge = (left, right) => {
    let sorted = [];

    // Checking to see if we have completed the two halves
    while(left.length && right.length) {

      // Check both right and left subarrays and smallest gets pushed to sorted[]
      // Convert date string format into epoch time for comparing values
      if(left[0].date.getTime() < right[0].date.getTime()) {
        sorted.push(left.shift());
      } else {
        sorted.push(right.shift());
      }
    }

    return [...sorted, ...left, ...right];
  };
  
  const mergeSort = (arr) => {
    // Divide and conquer
    const mid = arr.length / 2;

    // Sorted array
    if(arr.length <= 1) {
      return arr;
    }

    const left = arr.splice(0, mid);
    const right = arr;
    return merge(mergeSort(left), mergeSort(right));
  };

  const logEntries = [];
  // Go through all logSources
  for(let i = 0; i < logSources.length; i++) {
    const logSource = logSources[i];
    const logEntry = logSource.pop();

    // console.log(logEntry.date.getTime());
    logEntries.push(logEntry);
  }

  // console.log(logEntries);
  const sorted_arr = mergeSort(logEntries);
  // console.log(sorted_arr);

  // Print all logEntries in chrono order
  for(let i = 0; i < sorted_arr.length; i++) {
    printer.print(sorted_arr[i]);
  }

  printer.done();
  return console.log("Sync sort complete.");
};
