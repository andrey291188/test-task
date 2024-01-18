import { Suspense } from "react";
import { InputGroup, Form } from "react-bootstrap";
import { Outlet } from "react-router-dom";

interface FilterTypes {
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FilterList = ({value, onChange}: FilterTypes) => {
  return (
    <>
      <InputGroup>
          <InputGroup.Text id="btnGroupAddon">&#10003;</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Input group example"
            aria-label="Input group example"
            aria-describedby="btnGroupAddon"
            onChange={onChange}
          />
        </InputGroup>
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

export default FilterList;
