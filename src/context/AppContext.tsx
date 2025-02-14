import { createContext, useContext, useState, ReactNode } from 'react';

// Define types for the context
interface AppContextType {
    jsonOutput: unknown;
    error: string | null;
    setError: (message: string | null) => void;
    totalCount: number;
    setTotalCount: (count: number) => void;
    clearResults: () => void;
    base64Input: string;
    setBase64Input: (input: string) => void;
    classInput: string;
    setClassInput: (input: string) => void;
    setJsonOutput: (output: unknown) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
    const [base64Input, setBase64Input] = useState<string>('');
    const [classInput, setClassInput] = useState<string>('');
    const [jsonOutput, setJsonOutput] = useState<unknown>(null);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number>(0);

    const clearResults = (): void => {
        setJsonOutput(null);
        setTotalCount(0);
        setError(null);
    };

    return (
        <AppContext.Provider
            value={{
                jsonOutput,
                error,
                totalCount,
                base64Input,
                classInput,
                setJsonOutput,
                setClassInput,
                setBase64Input,
                setError,
                setTotalCount,
                clearResults,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const ctx = useContext(AppContext);
    if (!ctx) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return ctx;
}
