import { RouteComponentProps } from "@reach/router";
import React, {useEffect, useRef, useState} from "react";
import * as Pixi from 'pixi.js'
import {Viewport} from 'pixi-viewport'
import * as D3 from 'd3'
import "./PixiTest.css";


//https://www.devauthority.com/react/using-pixi-js-with-react-functional-components-hooks/
type PixiTestProps = RouteComponentProps & {

}

const PixiTest = (props: PixiTestProps) => {
    const ref = useRef(undefined);
    const [change_state, setChangeState] = useState(0);
    let test = undefined;
    let texture;
    let PixiAppRef = useRef<Pixi.Application>(undefined);
    let viewportRef = useRef<Viewport>(undefined);
    useEffect(() => {
        console.log('UseEffect() rerender only once')
        
        const PixiApp = new Pixi.Application({
            resizeTo: ref.current,
            backgroundColor: 0x012345,
            antialias: true,
        })
        ref.current.appendChild(PixiApp.view);
        // test = 4;
        
        // create viewport

        const viewport = new Viewport({
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
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

        
        return () => {
            // kill everything to hopefully avoid memory leaks
            PixiApp.destroy(true, true);
        };
    }, []);
    let oldZoom = undefined;
    //let graphics: Pixi.Graphics= new Pixi.Graphics();
    let zoomHandler = undefined;
    // function zoom(event) {
    //     graphics.position.x = event.transform.x;
    //     graphics.position.y = event.transform.y;
    //     graphics.scale.x = event.transform.k;
    //     graphics.scale.y = event.transform.k;
    // }
    let firstTime = useRef(true);
    function download_sprite_as_png(renderer = PixiAppRef.current.renderer, sprite = null) {
        renderer.options.antialias = true;
        const image = renderer.plugins.extract.image(PixiAppRef.current.stage, "image/webp", 1).getAttribute('src');
        ;
        console.log(typeof image);
        //image.toBlob(function(b) {
 var a = document.createElement('a');
            document.body.append(a);
            a.download = "image";
            a.href = image;
            a.click();
            a.remove();
        //});
        
           
        
    }
    useEffect(() => {
        //console.log(`${test === undefined ? 'Screeamamamamam' : 'Phewww'}`)
        //console.log('UseEffect() rerender every time ' + change_state
        const PixiApp = PixiAppRef.current;
        let graphics: Pixi.Graphics= new Pixi.Graphics();
        graphics.beginFill(0xABCDEF + 10000*change_state);
        //graphics.drawRect(0,100,100,100)
        graphics.drawCircle(0,-100*(change_state+1), 100)
        graphics.drawRect(0,100*change_state,100,100);
        graphics.endFill();
        //texture = PixiApp.renderer.generateTexture(graphics);
        //graphics.destroy(true);
        //PixiApp.stage.removeChildren();
        viewportRef.current.addChild(graphics);
        
        //graphics.removeChildren()
        //const pixiCanvas = D3.select(ref.current).select('canvas');
        //pixiCanvas.call(D3.zoom().on("zoom", zoom));
        
        //         var circle = new Pixi.Sprite(texture);
        // //circle.y = -100*(change_state+1);
        // circle.x = 100*change_state;
        // circle.angle = 45*(change_state)
       
        // console.log(`Texture Width ${circle.width}`)
        // console.log(`Texture Height ${circle.height}`)
        // viewportRef.current.addChild(circle);
        //graphics.destroy(true)
        // if(!oldZoom === undefined) {
        //     const transform = D3.zoomtransform(D3.select(ref.current))
        //     graphics.position.x = transform.x;
        //     graphics.position.y = transform.y;
        //     graphics.scale.x = transform.k;
        //     graphics.scale.y = transform.k;
        // }
        // oldZoom = newZoom;
    

        // graphics.beginFill(0xABCDEF + 10000*change_state);
        // graphics.drawRect(0,-100*change_state,100,100);
        // graphics.endFill();
        // //PixiApp.stage.addChild(graphics);
        // if(firstTime.current) {
        //     zoomHandler = D3.zoom().on("zoom", zoom)
        // pixiCanvas.call(zoomHandler);
        // firstTime.current = false;
        // PixiApp.stage.addChild(graphics);
        // graphics.removeChildren();
        // }

    
        // graphics.beginFill(0xABCDEF + 10000*change_state);
        // graphics.drawRect(0,-100*change_state,100,100);
        // graphics.endFill();
        // PixiApp.stage.addChild(graphics);
        // const zoomHandler2 = D3.zoom().on("zoom", zoom)
        // pixiCanvas.call(zoomHandler2);
        // function zoom(event) {
        //     graphics.position.x = event.transform.x;
        //     graphics.position.y = event.transform.y;
        //     graphics.scale.x = event.transform.k;
        //     graphics.scale.y = event.transform.k;
        // }
        // const transform = D3.zoomtransform(D3.select(ref.current))
        // graphics.position.x = transform.x;
        //     graphics.position.y = transform.y;
        //     graphics.scale.x = transform.k;
        //     graphics.scale.y = transform.k;

        //PixiApp.renderer.render(PixiApp.stage);
    });

    return (<div className = "pixi-test_container">
        <div className="pixi-test_button" onClick = {(event) => setChangeState(change_state+1)}>
            Button State change
        </div>
        <div className="pixi-test_button2" onClick = {(event) => download_sprite_as_png()}>
            Download as image
        </div>
        <div className="pixi_container" ref = {ref}>

        </div>
    </div>);
}

export default PixiTest;