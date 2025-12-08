import React, { useState } from 'react';

const Challenge = () => {
  const [numPairs, setNumPairs] = useState(1000);
  const [maxValue, setMaxValue] = useState(1000000);
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  // Calculate GCD (Greatest Common Divisor)
  const gcd = (a, b) => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  // Run the Monte Carlo simulation
  const runSimulation = () => {
    setIsRunning(true);
    setProgress(0);
    setResult(null);

    // Use setTimeout to allow UI to update
    setTimeout(() => {
      let coprimes = 0;
      const totalPairs = numPairs;
      const interval = Math.max(1, Math.floor(totalPairs / 100));

      for (let i = 0; i < totalPairs; i++) {
        // Select two random integers
        const a = Math.floor(Math.random() * maxValue) + 1;
        const b = Math.floor(Math.random() * maxValue) + 1;

        if (gcd(a, b) === 1) {
          coprimes++;
        }

        // Update progress
        if (i % interval === 0) {
          setProgress(Math.floor((i / totalPairs) * 100));
        }
      }

      const probability = coprimes / totalPairs;
      const theoretical = 6 / (Math.PI * Math.PI);
      const error = Math.abs(probability - theoretical) / theoretical * 100;

      setResult({
        probability,
        theoretical,
        error,
        coprimes,
        totalPairs
      });
      setProgress(100);
      setIsRunning(false);
    }, 100);
  };

  const theoreticalValue = 6 / (Math.PI * Math.PI);

  return (
    <div className="space-y-4 px-2 py-1 text-sm leading-relaxed select-none font-sans">
      <h2 className="text-2xl font-bold text-xp-blue-700 drop-shadow-sm flex items-center gap-2">
        <span>Challenge</span>
        <span className="text-sm font-normal text-gray-500 mt-1">- Mathematical Probability</span>
      </h2>

      <div className="space-y-4">
        {/* The Question */}
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-sm shadow-sm">
          <h3 className="font-bold text-xp-blue-800 mb-1">The Question:</h3>
          <p className="text-gray-800">
            What is the probability that two randomly selected integers are relatively prime (coprime)?
          </p>
        </div>

        {/* Reveal Button */}
        {!isRevealed && (
          <div className="flex justify-center">
            <button
              onClick={() => setIsRevealed(true)}
              className="px-6 py-2 text-sm font-bold rounded-sm border-2 bg-blue-500 text-white border-blue-600 hover:bg-blue-600 active:bg-blue-700"
              style={{
                borderTopColor: '#1E90FF',
                borderLeftColor: '#1E90FF',
                borderRightColor: '#0066CC',
                borderBottomColor: '#0066CC',
              }}
            >
              Reveal Solution
            </button>
          </div>
        )}

        {/* The Mathematical Derivation */}
        {isRevealed && (
          <div className="bg-xp-gray-100 border border-xp-gray-300 p-3 rounded-sm shadow-inner">
          <h3 className="font-bold mb-3 text-xp-blue-800 border-b border-gray-300 pb-1">
            Derivation: Riemann Zeta & The Basel Problem
          </h3>
          
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>1. The Probability Logic:</strong><br/>
              For two numbers to be coprime, no prime number <em>p</em> can divide both of them.
              The probability that <em>p</em> divides a random integer is 1/<em>p</em>.
              Therefore, the probability that <em>p</em> divides <strong>both</strong> is 1/<em>p</em>².
              The probability that <em>p</em> does <strong>not</strong> divide both is:
              <span className="block text-center font-serif py-1 font-bold">1 - 1/p²</span>
            </p>

            <p>
              <strong>2. Euler Product Formula:</strong><br/>
              To find the total probability, we multiply this over all prime numbers. This relates directly to the definition of the Riemann Zeta function via the Euler Product:
              <span className="block text-center font-serif py-1">
                P = ∏ (1 - 1/p²) = 1 / ζ(2)
              </span>
            </p>

            <p>
              <strong>3. The Basel Problem:</strong><br/>
              Euler solved the famous Basel Problem, proving that the sum of the reciprocals of squares converges to:
              <span className="block text-center font-serif py-1">
                ζ(2) = &pi;² / 6
              </span>
              Therefore, our probability is the inverse:
              <span className="block text-center text-lg font-bold text-xp-blue-700 py-1">
                6 / &Pi;² ≈ {theoreticalValue.toFixed(4)}
              </span>
            </p>
          </div>
          </div>
        )}

        {/* Interactive Simulation Controls */}
        {isRevealed && (
          <div className="bg-white border border-xp-gray-400 p-3 rounded-sm shadow-inner">
          <h3 className="font-bold mb-3 text-xp-blue-800 border-b border-gray-300 pb-1">
            Interactive Monte Carlo Simulation
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <label className="text-sm font-semibold text-gray-700 min-w-[120px]">
                Number of Pairs:
              </label>
              <input
                type="number"
                value={numPairs}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1000;
                  setNumPairs(Math.min(1000000, Math.max(100, value)));
                }}
                min="100"
                max="1000000"
                step="100"
                className="border border-gray-300 px-2 py-1 text-sm w-32"
                disabled={isRunning}
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm font-semibold text-gray-700 min-w-[120px]">
                Max Integer Value:
              </label>
              <input
                type="number"
                value={maxValue}
                onChange={(e) => setMaxValue(Math.max(100, parseInt(e.target.value) || 1000000))}
                min="100"
                max="10000000"
                step="100000"
                className="border border-gray-300 px-2 py-1 text-sm w-32"
                disabled={isRunning}
              />
            </div>

            <button
              onClick={runSimulation}
              disabled={isRunning}
              className={`px-4 py-2 text-sm font-bold rounded-sm border-2 ${
                isRunning
                  ? 'bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 text-white border-blue-600 hover:bg-blue-600 active:bg-blue-700'
              }`}
              style={{
                borderTopColor: isRunning ? '#808080' : '#1E90FF',
                borderLeftColor: isRunning ? '#808080' : '#1E90FF',
                borderRightColor: isRunning ? '#404040' : '#0066CC',
                borderBottomColor: isRunning ? '#404040' : '#0066CC',
              }}
            >
              {isRunning ? `Running... ${progress}%` : 'Run Simulation'}
            </button>

            {isRunning && (
              <div className="w-full bg-gray-200 border border-gray-400 h-4">
                <div
                  className="bg-blue-500 h-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>
          </div>
        )}

        {/* Results Display */}
        {isRevealed && result && (
          <div className="bg-green-50 border border-green-300 p-3 rounded-sm shadow-sm">
            <h3 className="font-bold mb-2 text-green-800">Simulation Results:</h3>
            <div className="space-y-1 text-sm">
              <p>
                <strong>Simulated Probability:</strong> {result.probability.toFixed(4)}
              </p>
              <p>
                <strong>Theoretical Value:</strong> {result.theoretical.toFixed(4)} (6/π²)
              </p>
              <p>
                <strong>Error:</strong> {result.error.toFixed(2)}%
              </p>
              <p>
                <strong>Coprime Pairs:</strong> {result.coprimes} / {result.totalPairs}
              </p>
            </div>
          </div>
        )}

        {/* Code Display */}
        {isRevealed && (
          <div className="bg-white border border-xp-gray-400 p-0 rounded-sm shadow-inner overflow-hidden">
          <div className="bg-xp-gray-200 px-3 py-1 border-b border-xp-gray-300 text-xs font-bold text-gray-600">
            monte_carlo_sim.js
          </div>
          <div className="p-3 bg-gray-900 text-green-400 font-mono text-xs overflow-x-auto">
            <pre>{`function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function monteCarloSimulation(N, maxVal) {
  let coprimes = 0;
  
  for (let i = 0; i < N; i++) {
    const a = Math.floor(Math.random() * maxVal) + 1;
    const b = Math.floor(Math.random() * maxVal) + 1;
    
    if (gcd(a, b) === 1) {
      coprimes++;
    }
  }
  
  return coprimes / N;
}

// Theoretical: 6/(π²) ≈ ${theoreticalValue.toFixed(4)}
// Run simulation to see results!
`}</pre>
          </div>
          </div>
        )}
        
        {isRevealed && (
          <p className="text-xs text-gray-600 italic">
            Conclusion: As the number of trials increases, the simulation converges to the theoretical limit of 6/π².
          </p>
        )}
      </div>
    </div>
  );
};

export default Challenge;

