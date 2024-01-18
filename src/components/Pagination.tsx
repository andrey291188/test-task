import { useEffect, useMemo, useState } from "react";
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { toolbarStyle } from "../styles/styles";

interface PaginationProps {
  totalPages: number;
  prePage: number;
  startIndex: number;
  setStartIndex: (value: number) => void;
  setEndIndex: (value: number) => void;
  setPrePage: (value: number) => void;
}

const Pagination = ({
  totalPages,
  setStartIndex,
  setEndIndex,
  setPrePage,
  prePage,
  startIndex,
}: PaginationProps) => {
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    setStartIndex((pageNumber - 1) * prePage);
    setEndIndex(startIndex + prePage);
  }, [startIndex, prePage, pageNumber, setStartIndex, setEndIndex]);

  const creatButtonPages = useMemo(() => {
    const visiblePages = [];
    for (let i = 1; i <= totalPages; i += 1) {
      if (i) {
        visiblePages.push(i);
      }
    }
    return visiblePages;
  }, [totalPages]);

  const handleClick = (item: any) => {
    if (item === "<") {
      setPageNumber((prev) => prev - 1);
    } else if (item === ">") {
      setPageNumber((prev) => prev + 1);
    } else if (item === "<<") {
      setPageNumber(1);
    } else if (item === ">>") {
      setPageNumber(totalPages);
    } else {
      setPageNumber(Number(item));
    }
  };

  const handlePrePageChange = (e: string | null) => {
    setPrePage(Number(e));
  };



  return (
    <div style={toolbarStyle}>
      <ButtonToolbar
        aria-label="Toolbar with button groups"
        style={{ marginRight: "10px" }}
      >
        <ButtonGroup className="me-2" aria-label="First group">
          <Button
            type="button"
            onClick={() => handleClick("<<")}
            disabled={pageNumber === 1}
          >
            &lt;&lt;
          </Button>

          <Button
            type="button"
            onClick={() => handleClick("<")}
            disabled={pageNumber === 1}
          >
            &lt;
          </Button>
        </ButtonGroup>

        <ButtonGroup className="me-2" aria-label="Second group">
          {totalPages > 1 &&
            creatButtonPages?.map((item) => (
              <Button
                type="button"
                onClick={() => handleClick(item)}
                key={item}
                style={{background: pageNumber === item ? '#043886' : '#0D6EFD'}}
              >
                {item}
              </Button>
            ))}
        </ButtonGroup>

        <ButtonGroup aria-label="Third group">
          <Button
            type="button"
            onClick={() => handleClick(">")}
            disabled={pageNumber === totalPages}
          >
            &gt;
          </Button>
          <Button
            type="button"
            onClick={() => handleClick(">>")}
            disabled={pageNumber === totalPages}
          >
            &gt;&gt;
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
      <DropdownButton
        align="end"
        title={prePage}
        id="dropdown-menu-align-end"
        onSelect={handlePrePageChange}
      >
        <Dropdown.Item eventKey="3">3</Dropdown.Item>
        <Dropdown.Item eventKey="6">6</Dropdown.Item>
        <Dropdown.Item eventKey="10">10</Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default Pagination;
