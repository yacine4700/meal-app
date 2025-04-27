export interface Filter {
    category?: string;
    area?: string;
    ingredient?: string;
}

export const defaultFilter: Filter = {
    category: '',
    area: '',
    ingredient: '',
};
