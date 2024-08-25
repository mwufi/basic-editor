'use client'

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { solveMathEquation } from './ai';

export default function OpenAITest() {

    const [equation, setEquation] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSolve = async () => {

        setLoading(true);
        try {
            const result = await solveMathEquation(equation);
            setResult(result);
        } catch (error) {
            setResult({ error: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">OpenAI Math Solver</h1>
            <div className="flex space-x-2 mb-4">
                <Input
                    value={equation}
                    onChange={(e) => setEquation(e.target.value)}
                    placeholder="Enter an equation (e.g., 8x + 7 = -23)"
                    className="flex-grow"
                />
                <Button onClick={handleSolve} disabled={loading}>
                    {loading ? 'Solving...' : 'Solve'}
                </Button>
            </div>
            {result && (
                <div className="mt-4">
                    {result.error ? (
                        <p className="text-red-500">{result.error}</p>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold mb-2">Solution Steps:</h2>
                            {result.steps.map((step, index) => (
                                <div key={index} className="mb-2">
                                    <p><strong>Step {index + 1}:</strong> {step.explanation}</p>
                                    <p className="ml-4">{step.output}</p>
                                </div>
                            ))}
                            <p className="mt-4"><strong>Final Answer:</strong> {result.final_answer}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
