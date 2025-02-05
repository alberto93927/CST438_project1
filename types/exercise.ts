export interface Exercise {
    id: number;
    name: string;
    description: string;
    category: {
        id: number;
        name: string;
    };
    exercises: {
        id: number;
        name: string;
        description: string;
        [key: string]: string | number | boolean;
    }[];
}