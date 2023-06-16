import React, {useState, useRef, useEffect} from "react";
import { Project, Symbol, Operator, Pattern, Point } from "../../../constants/Types";
import * as Pixi from 'pixi.js'
import {Viewport} from 'pixi-viewport'

import "./FractalRenderer.css";
import Util from "../../../constants/Util";

type Props = {
    initial: string
    num_iterations: number
    patterns: Pattern[]
    operators: Operator[]
    symbols: Symbol[]
    background_color: number
    setDownloadCallback: (downloadCallback: () => (string)) => void
    onRenderStart: () => void
    onRenderEnd: (renderTimeMilli: number) => void
    raiseWarning: (response: ((proceed: boolean) => void), num_shapes: number) => void
}

type FractalBounds = {
    max_x: number
    min_x: number
    max_y: number
    min_y: number
}

const FractalRenderer = (props: Props) => {
    
    const container_ref = useRef(undefined);
    const PixiAppRef = useRef<Pixi.Application>(undefined);
    const viewportRef = useRef<Viewport>(undefined);
    const fractalBoundsRef = useRef<FractalBounds>({
        max_x: 0,
        min_x: 0,
        max_y: 0,
        min_y: 0,
    });

    // run once only at the beginning
    useEffect(() => {
        const PixiApp = new Pixi.Application({
            resizeTo: container_ref.current,
            backgroundColor: props.background_color,
            antialias: true,
        })
        container_ref.current.appendChild(PixiApp.view);
        
        const viewport = new Viewport({
            screenWidth: container_ref.current.clientWidth,
            screenHeight: container_ref.current.clientHeight,
            worldWidth: 1000,
            worldHeight: 1000,
            passiveWheel: false,
            interaction: PixiApp.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
        })
        viewport
            .drag()
            .pinch()
            .wheel()
            .decelerate()

        PixiApp.stage.addChild(viewport);
        PixiAppRef.current = PixiApp;
        viewportRef.current = viewport;

        const onWindowResize = () => {
            viewportRef.current.resize(
                container_ref.current.clientWidth,
                container_ref.current.clientHeight,
                1000,
                1000,
            );
            zoomToPoint(computeIdealZoom(),computeCenter(),true);
            //console.log('resize')
        }

        window.addEventListener('resize', onWindowResize);

        props.setDownloadCallback(getDownloadImage);

        return () => {
            // kill everything to hopefully avoid memory leaks and cleanup properly
            viewportRef.current.destroy();
            PixiAppRef.current.destroy(true, true);
            viewportRef.current = undefined;
            PixiAppRef.current = undefined;
            window.removeEventListener('resize', onWindowResize);
        };
    }, []);

    // run with every data change
    useEffect(() => {
        const num_shapes = estimateNumberShapes()
        if(num_shapes > 2e6) {
            props.raiseWarning((proceed: boolean) => {
                if(proceed)
                    render();
            }, num_shapes)
        } else {
            render();
        }
        
    }, [props.initial, props.num_iterations, props.patterns, props.operators, props.symbols]);

    function render() {
        const viewport = viewportRef.current
        viewport.children.forEach((child) => {
            child.destroy(true);
        })
        
        const graphics = new Pixi.Graphics();

        const render_string = computeRenderString(props.num_iterations, props.initial, props.operators, props.symbols);
        
        let current_start_position = [0,0];
        let current_direction = 0;

        let max_x = 0, min_x = 0, max_y = 0, min_y = 0;


        props.onRenderStart();
        const startTime = performance.now();
        
        for(let instruction_ID of render_string) {
            if(isSymbol(instruction_ID)) {
                const pattern = getDrawPattern(instruction_ID);
                
                const direction_radians = current_direction*Math.PI/180.0;

                pattern.points.forEach((value: Point) => {

                    const relative_x = value.x - pattern.start_position[0];
                    const relative_y = value.y - pattern.start_position[1];
    
                    const transformed_x = relative_x*Math.cos(direction_radians) - relative_y*Math.sin(direction_radians);
                    const transformed_y = relative_x*Math.sin(direction_radians) + relative_y*Math.cos(direction_radians);
    
                    const absolute_x = (current_start_position[0] + transformed_x);
                    const absolute_y = (current_start_position[1] + transformed_y);

                    if(absolute_x > max_x) max_x = absolute_x;
                    if(absolute_y > max_y) max_y = absolute_y;
                    if(absolute_x < min_x) min_x = absolute_x;
                    if(absolute_y < min_y) min_y = absolute_y;

                    drawShape(graphics, value.shape, absolute_x, absolute_y, current_direction, value.color);
                })

                const displacement = [pattern.end_position[0] - pattern.start_position[0], pattern.end_position[1] - pattern.start_position[1]]
                current_start_position = Util.arrayOpp(current_start_position, Util.rotateXY(displacement, current_direction), (a1, a2) => a1 + a2);
            } else {
                const rotation = getOperatorRotation(instruction_ID);
                current_direction += rotation;
                if(current_direction > 180)
                    current_direction -= 360;
                else if (current_direction < -180)
                    current_direction += 360;
            }
        }
        viewport.addChild(graphics);

        updateFractalBounds(max_x, min_x, max_y, min_y);
        zoomToPoint(computeIdealZoom(), computeCenter(), render_string.length < 2e5);

        const endTime = performance.now();
        props.onRenderEnd(endTime-startTime);
    }

    useEffect(() => {
        const PixiApp = PixiAppRef.current;
        PixiApp.renderer.backgroundColor = props.background_color;
        PixiApp.renderer.render(PixiApp.stage);
    },[props.background_color]);

    function estimateNumberShapes(): number {
        let max_pattern_shapes = 0;
        for(let pattern of props.patterns) {
            if(pattern.points.length > max_pattern_shapes)
                max_pattern_shapes = pattern.points.length;
        }
        let max_exp_base = 1;
        for(let symbol of props.symbols) {
            const alphaletters = symbol.replacement_rule.match(/[a-z]/gi);
            if(alphaletters && alphaletters.length > max_exp_base)
                max_exp_base = alphaletters.length;
        }
        return max_pattern_shapes*Math.pow(max_exp_base, props.num_iterations);
    }

    function isSymbol(instruction_ID: string): boolean {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(instruction_ID);
    }

    function computeRenderString(num_iterations: number, initial: string, operators: Operator[], symbols: Symbol[],): string {
        let render_string = initial;

        const rules = {};

        operators.forEach((symbol: Operator) => {
            rules[symbol.name] = symbol.name;
        });
        symbols.forEach((symbol: Symbol) => {
            rules[symbol.name] = symbol.replacement_rule;
        });
    
        for(let i = 0; i < num_iterations; i++) {
            let new_string = "";
            for(let instruction_ID of render_string) {
                const substitution = rules[instruction_ID];
                if(substitution !== undefined)
                    new_string += rules[instruction_ID];
            }
            render_string = new_string;
        }
        
        return render_string;
    }

    function getOperatorRotation(operator_ID: string): number {
        const operator = props.operators.find((operator) => operator.name === operator_ID);
        if(operator === undefined)
            return 0;
        return operator.rotation;
    }

    function getDrawPattern(instruction_ID: string): Pattern {
        const found_pattern: Pattern = props.patterns.find((pattern: Pattern) => {
            for(let i = 0; i < pattern.symbol_names.length; i++) {
                if(pattern.symbol_names[i] === instruction_ID)
                    return true;
            }
        })
        if(found_pattern !== undefined)
            return found_pattern;
        return {
            symbol_names: [],
            points: [],
            start_position: [],
            end_position: [],
        } as Pattern;
    }

    const CELL_WIDTH = 16;

    function drawShape(graphics: Pixi.Graphics, shape: string, x:number, y: number, rotation: number, color: number):void {
            graphics.beginFill(color);
            Util.drawGraphic_pixi(graphics, shape, x*CELL_WIDTH, y*CELL_WIDTH, CELL_WIDTH, rotation);
            graphics.endFill();
    }

    // decreases zoom close to 1 and asymptotically approaches 0.75
    function getProperZoomLevel(max_fill_zoom: number): number {
        return (-0.9/(1/max_fill_zoom+1) + 0.9)*max_fill_zoom;
    }

    function updateFractalBounds(max_x: number, min_x: number, max_y: number, min_y: number,) {
        fractalBoundsRef.current = {
            max_x: max_x,
            min_x: min_x,
            max_y: max_y,
            min_y: min_y,
        } as FractalBounds;
    }

    function computeIdealZoom(): number {
        const fractalBounds = fractalBoundsRef.current;
        const max_x = fractalBounds.max_x;
        const min_x = fractalBounds.min_x;
        const max_y = fractalBounds.max_y;
        const min_y = fractalBounds.min_y;
        
        const fill_screen_height = container_ref.current.clientHeight/CELL_WIDTH, 
        fill_screen_width = container_ref.current.clientWidth/CELL_WIDTH;
        const distance_span_y = Math.abs(max_y-min_y)+1,
        distance_span_x = Math.abs(max_x - min_x)+1;

        const max_fill_zoom_level = Math.min(fill_screen_height/ distance_span_y, fill_screen_width/ distance_span_x);
        return getProperZoomLevel(max_fill_zoom_level);
    }

    function computeCenter(): number[] {
        const fractalBounds = fractalBoundsRef.current;
        const max_x = fractalBounds.max_x;
        const min_x = fractalBounds.min_x;
        const max_y = fractalBounds.max_y;
        const min_y = fractalBounds.min_y;

        const center_x = (max_x-min_x)/2 + min_x, center_y = (max_y-min_y)/2 + min_y;
        return [center_x, center_y];
    }

    function zoomToPoint(zoom: number, point: number[], animate: boolean) {
        const viewport = viewportRef.current;

        if(animate) {
            viewport.animate({
                time: 500,
                scale: zoom,
                position: {
                    x: CELL_WIDTH/2 + CELL_WIDTH*point[0],
                    y: CELL_WIDTH/2 + CELL_WIDTH*point[1],
                },
                ease: 'easeInOutSine',
                removeOnInterrupt: true,
            })
        } else {
            viewport.setTransform(
                container_ref.current.clientWidth/2 - CELL_WIDTH/2 - CELL_WIDTH*point[0],  
                container_ref.current.clientHeight/2 - CELL_WIDTH/2 - CELL_WIDTH*point[1])
                .setZoom(zoom, true)
        }
    }

    function getDownloadImage(): string {
        const viewport = viewportRef.current;
        const old_zoom = viewport.scale.x;
        
        const old_center = [viewport.position.x, viewport.y];
        // console.log(old_center)
        // console.log([container_ref.current.clientWidth/2, container_ref.current.clientHeight/2])
        // console.log(old_center[1]+container_ref.current.clientWidth/2);
        // console.log(computeCenter())
        const image_zoom = 2*computeIdealZoom();
        zoomToPoint(image_zoom, computeCenter(), false);
        const image = PixiAppRef.current.renderer.plugins.extract
            .image(PixiAppRef.current.stage, "image/png", 1).getAttribute('src');
        viewport.setTransform(
            old_center[0],  
            old_center[1], 
            old_zoom, old_zoom);
                //.setZoom(old_zoom, true)
                
        return image;
    }

    return (<div ref = {container_ref} className="fractal-renderer_container">
        
    </div>);

    // type TextureContainer = {
    //     symbol_names: string[]
    //     texture: Pixi.RenderTexture
    // }

    // function createTextures(patterns: Pattern[]): TextureContainer[] {
    //     const PixiApp = PixiAppRef.current;
    //     const sprites: TextureContainer[] = [];
    //     patterns.forEach((pattern: Pattern) => {
    //         const graphics = new Pixi.Graphics();
    //         pattern.points.forEach((point: Point) => {
    //             drawShape(graphics, point.x, point.y)
    //         })
    //         const texture = PixiApp.renderer.generateTexture(graphics);
            
    //         sprites.push({
    //             symbol_names: pattern.symbol_names,
    //             texture: texture,
    //         } as TextureContainer);
    //         graphics.destroy();
    //         //texture.destroy();
    //     });
    //     return sprites;
    // }

    // function getTexture(textures: TextureContainer[], instruction_ID: string): Pixi.RenderTexture {
    //     return textures.find((sprite_container: TextureContainer) => {
    //         for(let i = 0; i < sprite_container.symbol_names.length; i++) {
    //             if(sprite_container.symbol_names[i] === instruction_ID)
    //                 return true;
    //         }
    //     }).texture;
    // }


    // function drawTexture(parent: Viewport, texture: Pixi.RenderTexture, 
    //     x: number, y: number, angle: number): void {
        
    //         let graphics: Pixi.Graphics= new Pixi.Graphics();
    //         graphics.beginFill(0xABCDEF);
    //         graphics.drawRect(x*32,y*32,32,32)
    //         //graphics.drawCircle(0,-100*(change_state+1), 100)
    //         //graphics.drawRect(0,100*change_state,100,100);
    //         graphics.endFill();
    //         texture = PixiAppRef.current.renderer.generateTexture(graphics);
    //         graphics.destroy(true);
        
        
    //         const sprite = new Pixi.Sprite(texture);
        
    //     if(texture.orig === null)
    //     console.log('SCREAM!');
    //     //console.log(texture);
    //     sprite.x = CELL_WIDTH*x;
    //     sprite.y = CELL_WIDTH*y;
    //     sprite.angle = -angle;
    //     parent.addChild(sprite);
    // }

      
    // This doesn't work
    // useEffect(() => {
    //     console.log("attempt to rerender antialias")
    //     console.log(props.antialias)
    //     const PixiApp = PixiAppRef.current;
    //     PixiApp.renderer = new Pixi.Renderer({
    //         antialias: props.antialias
    //     })
    //     PixiApp.renderer.render(PixiApp.stage);
    // }, [props.antialias])
}

export default FractalRenderer;