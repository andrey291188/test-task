import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { CampaignsType } from "../../service/types";
import { findByIdCompaign } from "../../service/findById";
import data from "../../service/data.json";
import Pagination from "../../components/Pagination";
import { Button, Dropdown, DropdownButton, Table } from "react-bootstrap";
import { linkStyle } from "../../styles/styles";

interface CampaingTypes {
  visibleData: CampaignsType[] | null | undefined;
  getData: (valuey: CampaignsType[]) => void;
  field: (value: keyof CampaignsType) => void;
  statusPage: (value: string) => void;
}

const Campaign = ({
  visibleData,
  getData,
  field,
  statusPage,
}: CampaingTypes) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(2);
  const [prePage, setPrePage] = useState(3);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    "Select an option"
  );

  const { id } = useParams();
  const location = useLocation();
  const backLocationRefs = useRef(location.state ?? "/");

  const totalPages = Math.ceil(
    Array.isArray(visibleData) ? visibleData.length / prePage : 0
  );

  useEffect(() => {
    statusPage("campaigns");
    const fetchData = async () => {
      if (data && id) {
        const { campaigns } = await findByIdCompaign(id, data);
        getData(campaigns);
      }
    };
    fetchData();
  }, [id, getData, statusPage]);

  const handleCheckboxChange = (e: string | null) => {
    const typeValue = e as keyof CampaignsType;
    field(typeValue);
    switch (e) {
      case "campaignId":
        setSelectedOption("Id");
        break;
      case "clicks":
        setSelectedOption("Clicks");
        break;
      case "cost":
        setSelectedOption("Cost");
        break;
      case "date":
        setSelectedOption("Date");
        break;
      default:
        return;
    }
  };

  return (
    <>
   
      <DropdownButton
        align="end"
        title={selectedOption}
        id="dropdown-menu-align-end"
        onSelect={handleCheckboxChange}
      >
        <Dropdown.Item eventKey="campaignId">Id</Dropdown.Item>
        <Dropdown.Item eventKey="clicks">Clicks</Dropdown.Item>
        <Dropdown.Item eventKey="cost">Cost</Dropdown.Item>
        <Dropdown.Item eventKey="date">Date</Dropdown.Item>
      </DropdownButton>
      <Button variant="outline-primary" style={{position: 'absolute', top: '38px', right: '10px'}}><Link to={backLocationRefs.current} style={linkStyle}>Go Back</Link></Button>{' '}
      
      <Table striped bordered hover>
        <thead>
          <tr key="title2">
            <th>campaignId</th>
            <th>clicks</th>
            <th>cost</th>
            <th>date</th>
          </tr>
        </thead>
        <tbody>
          {visibleData
            ?.slice(startIndex, endIndex)
            .map(({ campaignId, clicks, cost, date }) => (
              <tr key={campaignId}>
                <td>{campaignId}</td>
                <td>{clicks}</td>
                <td>{cost}</td>
                <td>{date}</td>
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

export default Campaign;
