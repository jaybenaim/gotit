import React, { useState } from 'react';
import { FormControl, Dropdown } from "react-bootstrap";
import "./dropdown.scss"

const DropdownMenu = ({
  toggleTitle,
  style,
  labeledBy,
  data,
  onToggle,
  classname,
  onSelect,
}) => {
  const [value, setValue] = useState('');

  return (
    <div className="dropdown">
      <Dropdown>
        <Dropdown.Toggle id="dropdown-menu">
          <div
            value={toggleTitle}
            onClick={(e) => {
              e.preventDefault();
              onToggle !== undefined && onToggle(e);
            }}
            className="toggle-btn"
          >
            {toggleTitle} {" "}
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <div
            style={style}
            className={classname}
            aria-labelledby={labeledBy}
          >
            <FormControl
              autoFocus
              className="mx-3 my-2 w-auto"
              placeholder="Type to filter..."
              onChange={(e) => setValue(e.target.value)}
              value={value}
            />
            <ul className="list-unstyled">
              {data && data.map((child, i) =>
                child.includes(value) &&
                (
                  <Dropdown.Item
                    eventKey={i}
                    onClick={() => onSelect(child)}
                    key={i}
                  >
                    {child}
                  </Dropdown.Item>
                )
              )}
            </ul>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div >
  );
}

export default DropdownMenu; 