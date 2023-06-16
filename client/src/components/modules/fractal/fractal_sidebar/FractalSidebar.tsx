import React from "react";
import { Operator, Pattern, Symbol } from "../../../../constants/Types";
import Util from "../../../../constants/Util";
import "./FractalSidebar.css";
import GeneralEdit from "./GeneralEdit";
import OperatorEdit from "./OperatorEdit";
import OperatorEditList from "./OperatorEditList";
import PatternEdit from "./PatternEdit";
import PatternEditList from "./PatternEditList";
import PreviewRenderer from "./PatternPreviewRenderer";
import SymbolEdit from "./SymbolEdit";
import SymbolEditList from "./SymbolEditList";

type Props = {
    patterns: Pattern[]
    updatePatterns: (new_patterns: Pattern[]) => void
    onPatternClick: (pattern: Pattern) => void
    operators: Operator[]
    updateOperators: (new_operators: Operator[]) => void
    symbols: Symbol[]
    updateSymbols: (new_symbols: Symbol[]) => void
    num_iterations: number
    updateNumIterations: (new_num_iterations: number) => void
    initial: string
    updateInitial: (new_initial: string) => void
    background_color: number
    updateBackgroundColor: (new_background_color: number) => void
    //antialias: boolean
    //updateAntialias: (new_antialias: boolean) => void
}

const FractalSidebar = (props: Props) => {
    //const [initial_input_invalid, setInitialInputInvalid] = useState([] as string[]);

    function getInvalidInstructions(initial: string):string[] {
        const invalid_instructions: string[] = [];
        for(let instruction of initial) {
            const is_operator = props.operators.find(
                (operator: Operator) => operator.name === instruction
            ) !== undefined;
            const is_symbol = props.symbols.find(
                (symbol: Symbol) => symbol.name === instruction
            ) !== undefined;
            // console.log(`${instruction} is operator ${is_operator}`)
            // console.log(`${instruction} is symbol ${is_symbol}`)
            if(!is_operator && !is_symbol) {
                invalid_instructions.push(instruction);
            }
        }
        return invalid_instructions;
    }

    function onInitialUpdate(raw_initial: string):void {
        const invalid_instructions = getInvalidInstructions(raw_initial)
        
        if(invalid_instructions.length === 0) 
            props.updateInitial(raw_initial);
        //setInitialInputInvalid(invalid_instructions);
    }

    function onPatternsUpdate(new_patterns: Pattern[]) {
        // no conflicts with removed patterns
        props.updatePatterns(new_patterns);
    }

    function onSymbolsUpdate(new_symbols: Symbol[], removed_symbol: Symbol): void {
        if(removed_symbol !== undefined) {
            purgeInstruction(removed_symbol.name, true);
        } else {
            props.updateSymbols(new_symbols);
        }
    }

    function onOperatorsUpdate(new_operators: Operator[], removed_operator: Operator): void {
        if(removed_operator !== undefined) {
            purgeInstruction(removed_operator.name, false)
        }
        props.updateOperators(new_operators);
    }

    function purgeInstruction(instruction: string, isSymbol: boolean) {
        let new_initial: string = '';
        for(let old_instruction of props.initial) {
            if(old_instruction !== instruction)
                new_initial += old_instruction;
        }

        const new_symbols: Symbol[] = [];
        for(let old_symbol of props.symbols) {
            if(old_symbol.name !== instruction)
                new_symbols.push({
                    name: old_symbol.name,
                    replacement_rule: old_symbol.replacement_rule
                        .replace(instruction, ''),
                } as Symbol);
        }

        if(isSymbol) {
            const new_patterns: Pattern[] = [];
            for(let old_pattern of props.patterns) {
                new_patterns.push({
                    id: old_pattern.id,
                    symbol_names: old_pattern.symbol_names.filter(
                        (old_symbol_name: string) => old_symbol_name !== instruction),
                    points: old_pattern.points,
                    start_position: old_pattern.start_position,
                    end_position: old_pattern.end_position,
                } as Pattern)
            }
            props.updatePatterns(new_patterns);
        }

        props.updateInitial(new_initial);
        props.updateSymbols(new_symbols);
    }
    
    return <div className ='sidebar_container'>
        <div className = 'sidebar-scrolling_container'>
        <GeneralEdit
            num_iterations={props.num_iterations}
            updateNumIterations={props.updateNumIterations}
            initial={props.initial}
            updateInitial = {onInitialUpdate}
            symbols= {props.symbols}
            operators ={props.operators}
            background_color = {props.background_color}
            updateBackgroundColor = {props.updateBackgroundColor}
            />
        <PatternEditList
            patterns={props.patterns}
            updatePatterns={onPatternsUpdate}
            onPatternClick={props.onPatternClick}
            symbol_names={props.symbols.map((symbol: Symbol) => symbol.name)}/>
        <SymbolEditList
            symbols={props.symbols}
            updateSymbols={onSymbolsUpdate}
            getInvalidInstructions={getInvalidInstructions}
            operators={props.operators}/>
        <OperatorEditList
            operators={props.operators}
            updateOperators={onOperatorsUpdate}/>
        </div>
    </div>
}

export default FractalSidebar;