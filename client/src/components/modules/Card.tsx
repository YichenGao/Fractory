import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";

import "./Card.css";
import * as d3 from "d3";
import D3Drawer from "./D3Drawer";
import EditDialog from "./EditDialog";
import { post } from "../../utilities";

type CardProps = {
  artworkId: string;
  title: string;
  cellDeltas: [number, number][];
  endDelta: [number, number];
  numIterations: number;
  isEditing: boolean;
  position: number;
};

const useD3 = (renderD3) => {
  const ref = React.useRef();
  useEffect(() => {
    renderD3(d3.select(ref.current));
    return () => {};
  }, []);
  return ref;
};

const Card = (props: CardProps) => {
  // D3 rendering of preview
  const doD3Stuff = (svg) => {
    svg.attr("width", "100%");
    svg.attr("height", "100%");
    // svg.attr("preserveAspectRatio", "xMinYMin meet").classed("Result-svgResponsive", true);
    const artist = new D3Drawer(
      props.cellDeltas,
      props.endDelta,
      Math.min(5, props.numIterations),
      svg
    );
    artist.render();
  };
  const ref = useD3(doD3Stuff);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(props.title);
  const setNewTitle = (newTitle: string) => {
    post(`/api/title/${props.artworkId}`, { title: newTitle }).then((artwork) => {
      setTitle(artwork.title);
    });
  };
  const displayTitle = (title: string) => {
    if (title.length <= 12) return title;
    return title.slice(0, 6) + "..." + title.slice(title.length - 6);
  };

  return (
    <div className="Card-container">
      <div className="Card-svgRenderer">
        <svg id="svgContainer" ref={ref}></svg>
      </div>

      <EditDialog
        open={openDialog}
        setOpen={setOpenDialog}
        oldTitle={title}
        setNewTitle={setNewTitle}
      />

      {props.isEditing ? (
        <button className="Card-caption Card-caption-editing" onClick={() => setOpenDialog(true)}>
          {displayTitle(title)}
        </button>
      ) : (
        <Link to={`/create/simple_fractal_creator/${props.artworkId}`} className="Card-link">
          <div className="Card-caption">{displayTitle(title)}</div>
        </Link>
      )}
    </div>
  );
};

export default Card;
