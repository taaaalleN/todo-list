import React from "react";

const FilterButton = (props) => {
  return (
    <div className="filters btn-group stack-exception">
      <button type="button" className="btn toggle-btn" aria-pressed={props.isPressed} onClick={() => props.setFilter(props.name)}>
        <span className="visually-hidden">Show </span>
        <span>{props.name}</span>
        <span className="visually-hidden"> tasks</span>
      </button>
      {/* Vafan händer här? Ritas ut 3 ggr */}
      {/* <button type="button" className="btn toggle-btn" aria-pressed={false}>
        <span className="visually-hidden">Show </span>
        <span>Active</span>
        <span className="visually-hidden"> tasks</span>
      </button>
      <button type="button" className="btn toggle-btn" aria-pressed={false}>
        <span className="visually-hidden">Show </span>
        <span>Completed</span>
        <span className="visually-hidden"> tasks</span>
      </button> */}
    </div>
  );
};

export default FilterButton;
