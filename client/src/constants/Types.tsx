type Project = {
    id: string
    title: string
    patterns: Pattern[]
    symbols: Symbol[]
    operators: Operator[]
    initial: string
    iterations: number
    background_color: number
    //antialias: boolean
}

type Symbol = {
    name: string;
    replacement_rule: string;
}
type Operator = {
    name: string;
    rotation: number;
}
type Pattern = {
    id: number
    symbol_names: string[]
    points: Point[]
    start_position: number[]
    end_position: number[]
}
type Point = {
    x: number;
    y: number;
    color: number;
    shape: string;
}

export type { Project, Symbol, Operator, Pattern, Point };