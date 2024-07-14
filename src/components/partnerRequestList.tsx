import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Fab from "@mui/material/Fab";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  partnerRequests,
  updatePartnerRequestByUserId,
  updateProfileByUserId,
  insertNewShop,
} from "../apicalls/supabaseCalls/partnerRequestSupabaseCalls";

const PartnerRequestTable = React.memo(() => {
  const [partnerReqs, setPartnerReqs] = useState<any[]>([]);

  let partnerRequestsToVett;

  useEffect(() => {
    const getPartnerRequests = async () => {
      partnerRequestsToVett = await partnerRequests();
      console.log("???", partnerRequestsToVett)
      partnerRequestsToVett ? setPartnerReqs(partnerRequestsToVett) : [];
    };

    getPartnerRequests();
  }, []);

  const ValidateRequest = async (
    id: string,
    busName: string,
    lat: number,
    lng: number
  ) => {
    //add email to user (userProfile table)
    updatePartnerRequestByUserId(id, true);
    updateProfileByUserId(id, true);
    insertNewShop(busName, lat, lng, id);
  };

  const RejectRequest = async (id: string) => {
    //add email to user (userProfile table)
    updatePartnerRequestByUserId(id, false);
    updateProfileByUserId(id, false);
  };

  return (
    <TableContainer
      style={{
        width: "100%",
        margin: "auto",
        borderRadius: "5px",
        boxShadow: "3px 4px 5px 1px rgb(99, 99, 99)",
      }}
    >
      <Table>
        <TableHead style={{ backgroundColor: "#538bdb" }}>
          <TableRow>
            <TableCell
              style={{
                color: "white",
                width: 200,
                fontSize: 16,
                paddingLeft: 39,
              }}
            >
              <strong>Business Name</strong>
            </TableCell>
            <TableCell
              style={{
                color: "white",
                width: 100,
                fontSize: 16,
                paddingLeft: 39,
              }}
            >
              <strong>Website</strong>
            </TableCell>
            <TableCell
              align="center"
              style={{ color: "white", width: 100, fontSize: 16 }}
            >
              <strong>Latitude</strong>
            </TableCell>
            <TableCell
              align="center"
              style={{ color: "white", width: 100, fontSize: 16 }}
            >
              <strong>Longitude</strong>
            </TableCell>
            <TableCell
              align="center"
              style={{ color: "white", width: 50, fontSize: 16 }}
            >
              <strong>Congrats Email</strong>
            </TableCell>
            <TableCell
              align="center"
              style={{ color: "white", width: 50, fontSize: 16 }}
            >
              <strong>Validate</strong>
            </TableCell>
            <TableCell
              align="center"
              style={{ color: "white", width: 50, fontSize: 16 }}
            >
              <strong>Sorry Email</strong>
            </TableCell>
            <TableCell
              align="center"
              style={{ color: "white", width: 50, fontSize: 16 }}
            >
              <strong>Reject</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {partnerReqs &&
            partnerReqs.map((req: any) => (
              <TableRow key={req.id} style={{ padding: 0 }}>
                <TableCell
                  sx={{ color: "#2B2D42", paddingLeft: 5 }}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                >
                  <strong>{req.businessName}</strong>
                </TableCell>
                <TableCell
                  sx={{ color: "#2B2D42", paddingLeft: 5 }}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                >
                  <a href={req.webpageLink}>{req.webpageLink}</a>
                </TableCell>
                <TableCell align="center" sx={{ color: "#2B2D42" }}>
                  <strong>{req.latitude}</strong>
                </TableCell>
                <TableCell align="center" style={{ height: 10 }}>
                  <strong>{req.longitude}</strong>
                </TableCell>

                {/* need email of user who applied  */}
                <TableCell align="center" style={{ height: 10 }}>
                  <a
                    href={`mailto:${req.userEmail}?subject=Update%20Regarding%20Your%20Scuba%20SEAsons%20Partner%20Account%20Application&body=Congrats!%20Your%20Scuba%20SEAsons%20partner%20account%20upgrade%20account%20application%20has%20been%20approved!%0D%0A%0D%0A%0D%0A%0D%0AOn%20your%20next%20login%20you%20will%20see%20that%20you%20now%20have%20access%20to%20our%20partner%20features%20including%20the%20Trip%20creator!%0D%0A%0D%0A%0D%0A%0D%0AThis%20feature%20let's%20you%20register%20trips%20you%20are%20offering%20to%20divers,%20showing%20what%20dive%20sites%20are%20potenitally%20part%20of%20it%20and%20let%20divers%20see%20what%20sea%20creatues%20have%20been%20spotted%20on%20those%20sites%20recently!
                    %0D%0A%0D%0A%0D%0A%0D%0AThanks%20you%20for%20being%20a%20valued%20memeber%20of%20the%20Scuba%20SEAsons%20community%20we%20hope%20that%20%20the%20partner%20features%20will%20help%20to%20grow%20your%20busines
                    %0D%0A%0D%0A%0D%0A%0D%0ASincerely,%20the%20Scuba%20SEAsons%20team
                   `}
                  >
                    Send Congrats Email
                  </a>
                </TableCell>
                <TableCell align="center" style={{ height: 10 }}>
                  <Fab color="primary" aria-label="add">
                    <TaskAltIcon
                      onClick={() =>
                        ValidateRequest(
                          req.userId,
                          req.businessName,
                          req.latitude,
                          req.longitude
                        )
                      }
                    />
                  </Fab>
                </TableCell>

                 {/* need email of user who applied  */}
                <TableCell align="center" style={{ height: 10 }}>
                  <a
                    href={`mailto:${req.userEmail}?subject=Update%20Regarding%20Your%20Scuba%20SEAsons%20Partner%20Account%20Application&body=Hello%20Your%20Scuba%20SEAsons%20partner%20account%20upgrade%20account%20application%20has%20been%20declined%0D%0A%0D%0A%0D%0A%0D%0AWe%20were%20unable%20to%20definitively%20determine%20that%20your%20business%20is%20a%20compatible%20(diving%20related)%20business.%0D%0A%0D%0A%0D%0A%0D%0AIf%20you%20would%20like%20to%20challenge%20this%20result%20please%20reply%20to%20this%20email%20with%20further%20evidence%20that%20shows%20that%20your%20business%20actively%20serves%20the%20diving%20community.
                    %0D%0A%0D%0A%0D%0A%0D%0AThanks,%20the%20Scuba%20SEAsons%20team
                   `}
                  >
                    Send Sorry Email
                  </a>
                </TableCell>
                <TableCell align="center" style={{ height: 10 }}>
                  <Fab color="secondary" aria-label="add">
                    <HighlightOffIcon
                      onClick={() => RejectRequest(req.userId)}
                    />
                  </Fab>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default PartnerRequestTable;
