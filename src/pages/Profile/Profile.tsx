import { Link, useLocation, useParams } from "react-router-dom";
import data from "../../service/data.json";
import { findByIdProfile } from "../../service/findById";
import { useEffect, useState } from "react";
import { ProfileType } from "../../service/types";
import Pagination from "../../components/Pagination";
import { Button, Dropdown, DropdownButton, Table } from "react-bootstrap";
import { linkStyle } from "../../styles/styles";

interface ProfileTypes {
  visibleData: ProfileType[] | null | undefined;
  getData: (valuey: ProfileType[]) => void;
  field: (value: keyof ProfileType) => void;
  statusPage: (value: string) => void;
}

const Profile = ({ visibleData, getData, field, statusPage }: ProfileTypes) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(2);
  const [prePage, setPrePage] = useState(3);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    "Select an option"
  )
  const { id } = useParams();
  const location = useLocation();

  const totalPages = Math.ceil(
    Array.isArray(visibleData) ? visibleData.length / prePage : 0
  );

  useEffect(() => {
    statusPage("profiles");
    const fetchData = async () => {
      if (data && id) {
        const { profile } = await findByIdProfile(id, data);
        getData(profile);
      }
    };
    fetchData();
  }, [getData, id, statusPage]);

  const handleCheckboxChange = (e: string | null) => {
    const typeValue = e as keyof ProfileType;
    field(typeValue);
    switch (e) {
      case "profileId":
        setSelectedOption("Id");
        break;
      case "country":
        setSelectedOption("Country");
        break;
      case "marketplace":
        setSelectedOption("Marketplace");
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
        style={{marginLeft: '10px'}}
      >
        <Dropdown.Item eventKey="profileId">Id</Dropdown.Item>
        <Dropdown.Item eventKey="country">Country</Dropdown.Item>
        <Dropdown.Item eventKey="marketplace">Marketplace</Dropdown.Item>
      </DropdownButton>
      <Button variant="outline-primary" style={{position: 'absolute', top: '38px', right: '10px'}}><Link to={"/"} style={linkStyle}>Go Back</Link></Button>{' '}
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>profileId</th>
            <th>country</th>
            <th>marketplace</th>
          </tr>
        </thead>
        <tbody>
          {visibleData
            ?.slice(startIndex, endIndex)
            .map(({ profileId, country, marketplace }) => (
              <tr key={profileId}>
                <td>
                  <Link to={`/compaign/${profileId}`} state={location} style={linkStyle}>
                    {profileId}
                  </Link>
                </td>
                <td>
                  <Link to={`/compaign/${profileId}`} state={location} style={linkStyle}>
                    {country}
                  </Link>
                </td>
                <td>
                  <Link to={`/compaign/${profileId}`} state={location} style={linkStyle}>
                    {marketplace}
                  </Link>
                </td>
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

export default Profile;
