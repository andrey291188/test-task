import React, { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Account from "./pages/Account/Account";
import FilterList from "./components/FilterList";
import { CampaignsType, DataType, ProfileType } from "./service/types";
import Campaign from "./pages/Campaign/Campaign";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [filter, setFilter] = useState("");
  const [accountsData, setAccountsData] = useState<DataType[] | null>(null);
  const [campaignsData, setCampaignsData] = useState<CampaignsType[] | null>(
    null
  );
  const [profilesData, setProfilesData] = useState<ProfileType[] | null>(null);
  const [accountsFilterField, setAccountsFilterField] =
    useState<keyof DataType>("email");
  const [campaignsFilterField, setCampaignsFilterField] =
    useState<keyof CampaignsType>("clicks");
  const [profilesFilterField, setProfilesFilterField] =
    useState<keyof ProfileType>("country");
  const [page, setPage] = useState("accounts");
 

  const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleData = useMemo(() => {
    const normalizedFilter = filter.toLowerCase();
    let filteredData: any = [];
    switch (page) {
      case "accounts":
        filteredData =
          accountsData?.filter((item) =>
            item[accountsFilterField]
              ?.toString()
              .toLowerCase()
              .includes(normalizedFilter)
          ) || [];
        break;
      case "campaigns":
        filteredData =
          campaignsData?.filter((item) =>
            item[campaignsFilterField]
              ?.toString()
              .toLowerCase()
              .includes(normalizedFilter)
          ) || [];
        break;
      case "profiles":
        filteredData =
          profilesData?.filter((item) =>
            item[profilesFilterField]
              ?.toString()
              .toLowerCase()
              .includes(normalizedFilter)
          ) || [];
        break;
      default:
        break;
    }
    return filteredData;
  }, [
    accountsData,
    campaignsData,
    profilesData,
    filter,
    accountsFilterField,
    campaignsFilterField,
    profilesFilterField,
    page,
  ]);

  return (
    <Routes>
      <Route
        path="/"
        element={<FilterList value={filter} onChange={changeFilter} />}
      >
        <Route
          index
          element={
            <Account
              visibleData={getVisibleData}
              getData={setAccountsData}
              field={setAccountsFilterField}
              statusPage={setPage}
            />
          }
        />
        <Route
          path="profile/:id"
          element={
            <Profile
              visibleData={getVisibleData}
              getData={setProfilesData}
              field={setProfilesFilterField}
              statusPage={setPage}
            />
          }
        />
        <Route
          path="compaign/:id"
          element={
            <Campaign
              visibleData={getVisibleData}
              getData={setCampaignsData}
              field={setCampaignsFilterField}
              statusPage={setPage}
            />
          }
        />
      </Route>
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>

  );
}

export default App;
