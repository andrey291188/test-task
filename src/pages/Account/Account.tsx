import { useNavigate } from "react-router-dom";
import data from "../../service/data.json";
import { DataType } from "../../service/types";
import { useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import { Dropdown, DropdownButton, Table } from "react-bootstrap";

interface AccountTypes {
  visibleData: DataType[] | null | undefined;
  getData: (valuey: DataType[]) => void;
  field: (value: keyof DataType) => void;
  statusPage: (value: string) => void;
}

const Account = ({ visibleData, getData, field, statusPage }: AccountTypes) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(2);
  const [prePage, setPrePage] = useState(3);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    "Select an option"
  );
  const navigate = useNavigate();

  const totalPages = Math.ceil(
    Array.isArray(visibleData) ? visibleData.length / prePage : 0
  );

  useEffect(() => {
    statusPage("accounts");
    const fetchData = async () => {
      if (data) {
        getData(data);
      }
    };
    fetchData();
  }, [getData, statusPage]);

  const handleCheckboxChange = (e: string | null) => {
    const typeValue = e as keyof DataType;
    field(typeValue);
    switch (e) {
      case "accountId":
        setSelectedOption("Id");
        break;
      case "email":
        setSelectedOption("Email");
        break;
      case "authToken":
        setSelectedOption("Auth Token");
        break;
      case "creationDate":
        setSelectedOption("Creation date");
        break;
      default:
        return;
    }
  };

  const handleClick = (id: string) => {
    navigate(`profile/${id}`);
  };

  return (
    <>
      <DropdownButton
        align="end"
        title={selectedOption}
        id="dropdown-menu-align-end"
        onSelect={handleCheckboxChange}
      >
        <Dropdown.Item eventKey="accountId">Id</Dropdown.Item>
        <Dropdown.Item eventKey="email">Email</Dropdown.Item>
        <Dropdown.Item eventKey="authToken">Auth Token</Dropdown.Item>
        <Dropdown.Item eventKey="creationDate">Creation date</Dropdown.Item>
      </DropdownButton>
      <Table striped bordered hover>
        <thead>
          <tr key="title">
            <th>id</th>
            <th>email</th>
            <th>auth token</th>
            <th>creation date</th>
          </tr>
        </thead>
        <tbody>
          {visibleData
            ?.slice(startIndex, endIndex)
            .map(({ accountId, email, authToken, creationDate }) => (
              <tr onClick={() => handleClick(accountId)} key={accountId}>
                <td>{accountId}</td>
                <td>{email}</td>
                <td>{authToken}</td>
                <td>{creationDate}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          setStartIndex={setStartIndex}
          setEndIndex={setEndIndex}
          prePage={prePage}
          startIndex={startIndex}
          setPrePage={setPrePage}
        />
      )}
    </>
  );
};

export default Account;
