import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Details from "./Tabs/Details";
import Providers from "./Tabs/Providers";
import TermDates from "./Tabs/TermDates";
import Spaces from "./Tabs/Spaces";
import Facilities from "./Tabs/Facilities";
import Events from "./Tabs/Events";
import Staff from "./Tabs/Staff";
import Gallery from "./Tabs/Gallery";
import IncidentReport from "./Tabs/IncidentReport";
import Booking from "./Tabs/Booking";
import Calander from "./Tabs/Calander";

const TabsVenue = ({ venueId }) => {
  return (
    <Tabs
      defaultActiveKey="details"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="details" title="Details">
        <Details venueId={venueId} />
      </Tab>
      <Tab eventKey="providers" title="Providers">
        <Providers venueId={venueId} />
      </Tab>
      <Tab eventKey="booking" title="Booking">
        <Booking venueId={venueId} />
      </Tab>
      <Tab eventKey="calendar" title="Calendar">
        <Calander venueId={venueId} />
      </Tab>
      <Tab eventKey="termdates" title="Term Dates">
        <TermDates venueId={venueId} />
      </Tab>
      <Tab eventKey="spaces" title="Spaces">
        <Spaces venueId={venueId} />
      </Tab>
      <Tab eventKey="facilities" title="Facilities">
        <Facilities venueId={venueId} />
      </Tab>
      <Tab eventKey="events" title="Events">
        <Events venueId={venueId} />
      </Tab>
      <Tab eventKey="incidentreport" title="Incident Report">
        <IncidentReport />
      </Tab>

      <Tab eventKey="staff" title="Staff">
        <Staff venueId={venueId} />
      </Tab>

      <Tab eventKey="gallery" title="Gallery">
        <Gallery venueId={venueId} />
      </Tab>
    </Tabs>
  );
};

export default TabsVenue;
