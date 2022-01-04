export interface TocEntry {
    level: number;
    title: string;
    element: string;
}

export interface CurrentContentStateInterface {
    tableOfContents: Array<TocEntry>;
}

const state: CurrentContentStateInterface = {
    tableOfContents: [],
};

export default state;
