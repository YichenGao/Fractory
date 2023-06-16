import React, {useState} from "react";
import { symbolName } from "typescript";
import { Pattern} from "../../../../constants/Types";

import "./FractalSidebar.css";
import PatternEdit from "./PatternEdit";

type Props = {
    patterns: Pattern[]
    updatePatterns: (new_patterns: Pattern[]) => void
    onPatternClick: (pattern: Pattern) => void
    symbol_names: string[]
}

const PatternEditList = (props: Props) => {
    function updatePattern(new_pattern: Pattern, new_symbol_name: string): void {
        const new_patterns: Pattern[] = [];
        if(new_symbol_name === undefined) {
            for(let old_pattern of props.patterns) {
                if(old_pattern.id === new_pattern.id)
                    new_patterns.push(new_pattern)
                else
                    new_patterns.push(old_pattern)
            }
        } else {
            for(let old_pattern of props.patterns) {
                if(old_pattern.id === new_pattern.id)
                    new_patterns.push(new_pattern)
                else
                    new_patterns.push({
                        id: old_pattern.id,
                        symbol_names: old_pattern.symbol_names.filter(
                            (symbol_name: string) => symbol_name !== new_symbol_name
                        ),
                        points: old_pattern.points,
                        start_position: old_pattern.start_position,
                        end_position: old_pattern.end_position,
                    } as Pattern)
            }
        }
        props.updatePatterns(new_patterns);
    }

    function removePattern(remove_pattern: Pattern): void {
        const new_patterns: Pattern[] = [];
        for(let old_pattern of props.patterns) {
            if(old_pattern.id !== remove_pattern.id)
                new_patterns.push(old_pattern)
        }
        props.updatePatterns(new_patterns);
    }

    function getNewPatternID(): number {
        let new_id = 0;
        while(true) {
            if(undefined === props.patterns.find(
                (pattern: Pattern) => pattern.id === new_id))
                return new_id;
            new_id++;
        }
    }

    function addPattern(): void {
        props.updatePatterns([...props.patterns].concat({
            id: getNewPatternID(),
            symbol_names: [],
            points: [],
            start_position: [],
            end_position: [],
        } as Pattern));
    }
    
    return (<div className="fractal-sidebar-section-edit_container box-shadow">
        <div className = "fractal-sidebar-section-title_text box-shadow">
            PATTERNS
        </div>
        <div className="fractal-sidebar-section-list_container">
            {
                        props.patterns.map((pattern: Pattern, index: number) => 
                            <PatternEdit key = {index} 
                                pattern={pattern} 
                                updatePattern={updatePattern}
                                removePattern={removePattern}
                                onPatternClick={props.onPatternClick}
                                symbol_names={props.symbol_names}
                                />
                        )
                    }
        </div>
        
        <div className="fractal-sidebar-add-new_button" onClick={(event) => addPattern()}>
            Add Pattern
        </div> 
    </div>);
}

export default PatternEditList;