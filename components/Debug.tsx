import React from 'react';

interface DebugProps {
    title: string;
    obj: any;
}

const Debug: React.FC<DebugProps> = ({ title, obj }) => {
    const [isWrapped, setIsWrapped] = React.useState(true);
    const content = typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2);

    return (
        <div className="mb-4 relative">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{title}:</h3>
                <label className="flex items-center sticky top-0">
                    <input
                        type="checkbox"
                        checked={isWrapped}
                        onChange={() => setIsWrapped(!isWrapped)}
                        className="mr-2"
                    />
                    Wrap
                </label>
            </div>
            <pre className={`bg-gray-100 p-2 rounded ${isWrapped ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}>
                {content}
            </pre>
        </div>
    );
};

export default Debug;
