import { RouteComponentProps } from "@reach/router";
import React, { useState, useRef } from "react";
import { Operator, Pattern, Symbol, Point } from "../../constants/Types";
import FractalNavBar from "../modules/fractal/FractalNavBar";
import FractalRenderer from "../modules/fractal/FractalRenderer";
import PatternEditor from "../modules/fractal/fractal_pattern_edit/PatternEditor";
import FractalSidebar from "../modules/fractal/fractal_sidebar/FractalSidebar";
import Tutorial from "../modules/fractal/Tutorial";
import Warning from "../modules/fractal/Warning";
import "./FractalCreator.css";



type FractalCreatorProps = RouteComponentProps & {
    is_new_project: boolean;
}

const FractalCreator = (props: FractalCreatorProps) => {
    
    // project states 
    // TODO: load and save these props from/to database
    const [title, setTitle] = useState("");
    const [patterns, setPatterns] = useState([{
        id: 0,
        symbol_names: ["A", "B"],
        points: [{
            x: 4,
            y: 5,
            shape: 'ecirW',
            color: 0x0,
        } as Point,
        {
            x: 5,
            y: 5,
            shape: 'rect',
            color: 0x0,
        } as Point,{
            x: 6,
            y: 5,
            shape: 'ecirE',
            color: 0x0,
        } as Point],
        start_position: [4,5],
        end_position: [6,5],
    } as Pattern,    
    ]);
    const [symbols, setSymbols] = useState([
        {
            name: "A",
            replacement_rule: "A+B",
        } as Symbol, 
        {
            name: "B",
            replacement_rule: "A-B",
        } as Symbol, 
    ]);
    const [operators, setOperators] = useState([
        {
            name: "+",
            rotation: 90,
        } as Operator,
        {
            name: "-",
            rotation: -90,
        } as Operator
    ]);
    const [initial, setInitial] = useState("A");
    const [num_iterations, setNumIterations] = useState(0);
    const [background_color, setBackgroundColor] = useState(0xFFFFFF);

    const [is_editor_open, setEditorOpen] = useState(false); 
    const [editing_pattern, setEditingPattern] = useState({
        id: 0,
        symbol_names: [],
        points: [],
        start_position: [],
        end_position: [],
    } as Pattern);
    const [is_tutorial_open, setTutorialOpen] = useState(false);
    const [is_warning_open, setWarningOpen] = useState(false);

    function saveProject(): void {

    }

    function updatePattern(new_pattern: Pattern): void {
        const new_patterns: Pattern[] = [];
        for(let old_pattern of patterns) {
            if(old_pattern.id === new_pattern.id)
                new_patterns.push(new_pattern)
            else
                new_patterns.push(old_pattern)
        }
        setPatterns(new_patterns)
        //console.log(new_patterns);
        setEditorOpen(false);
    }

    function onPatternClick(pattern: Pattern) {
        setEditingPattern(pattern);
        setEditorOpen(true);
    }

    function onRenderStart(): void {

    }

    function onRenderEnd(renderTimeMilli: number): void {

    }

    function onTutorialProceed() : void {
        setTutorialOpen(false);
    }

    function openTutorial(): void {
        setTutorialOpen(true);
    }

    const warningCallbackRef = useRef(undefined);
    const [warning_num_shapes, setWarningNumShapes] = useState(0);
    function raiseWarning(callback: ((proceed: boolean) => void), num_shapes: number): void {
        
        warningCallbackRef.current = callback;
        setWarningNumShapes(num_shapes);
        setWarningOpen(true);
    }

    function onWarningResponse(proceed: boolean) {
        if(proceed)
            warningCallbackRef.current(proceed);
        else {
            setNumIterations(num_iterations-2);
            warningCallbackRef.current(false);
        }
        setWarningOpen(false);
    }

    const downloadCallbackRef = useRef(undefined);
    function onDownloadClick() {
        //console.log("download attempt");
        const image = downloadCallbackRef.current();
        const a = document.createElement('a');
            document.body.append(a);
            a.download = `${title.length > 0 ? title : 'Untitled Fractal'}`;
            a.href = image;
            a.click();
            a.remove();
    }

    function setDownloadCallback(downloadCallback: () => string): void {
        downloadCallbackRef.current = downloadCallback;
    }
    
    return (<div className = 'fractal-creator_container'>
        <FractalNavBar 
            onSaveClick={saveProject}
            onDownloadImageClick={onDownloadClick}
            title={title}
            updateTitle={setTitle}
            openTutorial={openTutorial}
        />
        <div className="fractal-creator-editor_container">
            <FractalRenderer
            num_iterations={num_iterations}
            initial={initial}
            patterns={patterns}
            symbols={symbols}
            operators={operators}
            background_color={background_color}
            onRenderStart={onRenderStart}
            onRenderEnd={onRenderEnd}
            raiseWarning={raiseWarning}
            setDownloadCallback={setDownloadCallback}
            />
        <FractalSidebar 
            operators={operators}
            updateOperators={setOperators}
            symbols={symbols}
            updateSymbols={setSymbols}
            patterns={patterns}
            updatePatterns={setPatterns}
            onPatternClick={onPatternClick}
            initial={initial}
            updateInitial={setInitial}
            num_iterations={num_iterations}
            updateNumIterations={setNumIterations}
            background_color={background_color}
            updateBackgroundColor={setBackgroundColor}
        />
        </div>
        
        <div className = {`fractal-creator-pattern-editor_container 
            ${is_editor_open
                ? 'visible'
                : ''
            }`}>
            <PatternEditor 
                pattern={editing_pattern} 
                onPatternUpdate={updatePattern}/>
        </div>
        <div className = {`fractal-creator-warning_container 
            ${is_tutorial_open
                ? 'visible'
                : ''
            }`}>
            <Tutorial
                onProceedClick={onTutorialProceed}/>
        </div>
        <div className = {`fractal-creator-warning_container 
            ${is_warning_open
                ? 'visible'
                : ''
            }`}>
            <Warning
                onWarningResponse={onWarningResponse}
                num_shapes={warning_num_shapes}/>
        </div>
    </div>);
};

export default FractalCreator;
