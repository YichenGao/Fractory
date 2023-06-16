import React, {useState} from "react";
import { Symbol, Operator } from "../../../../constants/Types";

import "./FractalSidebar.css";
import SymbolEdit from "./SymbolEdit";

type Props = {
    symbols: Symbol[]
    updateSymbols: (new_symbols: Symbol[], removed_symbol: Symbol) => void
    getInvalidInstructions: (replacement_rule: string) => string[]
    operators: Operator[]
}

const SymbolEditList = (props: Props) => {
    
    function updateSymbol(new_symbol: Symbol): void {
        const new_symbols = [];
        for(let old_symbol of props.symbols) {
            if(old_symbol.name === new_symbol.name)
                new_symbols.push(new_symbol);
            else 
                new_symbols.push(old_symbol);
        }
        props.updateSymbols(new_symbols, undefined);
    }

    function removeSymbol(remove_symbol: Symbol): void {
        const new_symbols = [];
        for(let old_symbol of props.symbols) {
            if(old_symbol.name !== remove_symbol.name)
                new_symbols.push(old_symbol);
        }
        props.updateSymbols(new_symbols, remove_symbol);
    }

    const symbol_names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    function getNextSymbolName(): string {
        for(let name of symbol_names) {
            if(undefined === props.symbols.find(
                    (symbol: Symbol) => symbol.name === name))
                return name;
        }
        return '';
    }

    function addSymbol(): void {
        const new_symbol_name = getNextSymbolName();
        if(new_symbol_name.length === 1) {
            const new_symbol = {
                name: new_symbol_name,
                replacement_rule: '',
            } as Symbol;
            const new_symbols = [... props.symbols];
            new_symbols.push(new_symbol);
            props.updateSymbols(new_symbols, undefined);
        }
    }
    
    return (<div className="fractal-sidebar-section-edit_container box-shadow">
        <div className = "fractal-sidebar-section-title_text box-shadow">
            SYMBOLS
        </div>
        <div className="fractal-sidebar-section-list_container">
            {
                        props.symbols.map((symbol: Symbol) => 
                            <SymbolEdit key = {symbol.name} 
                                symbol={symbol} 
                                updateSymbol={updateSymbol}
                                removeSymbol={removeSymbol}
                                getInvalidInstructions={props.getInvalidInstructions}
                                symbols={props.symbols}
                                operators={props.operators}/>
                        )
                    }
        </div>
        
        <div className="fractal-sidebar-add-new_button" onClick={(event) => addSymbol()}>
            Add Symbol
        </div> 
    </div>);
}

export default SymbolEditList;