"use strict";

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise((resolve, reject) => {
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

    async function gatherEntries() {
      // Go through all logSources
      for(let i = 0; i < logSources.length; i++) {
        const logSource = logSources[i];
        const logEntry = await logSource.popAsync();
        logEntries.push(logEntry);
      }
    };

    const logEntries = [];

    gatherEntries(logSources).then(() => {
      console.log("Start sorting.")
    }).then(() => {
      // Handle async function gatherEntries
      const sorted_arr = mergeSort(logEntries);

      // Print all logEntries in chrono order
      for(let i = 0; i < sorted_arr.length; i++) {
        printer.print(sorted_arr[i]);
      }

      printer.done();
      resolve(console.log("Async sort complete."));
    });
  });
};
