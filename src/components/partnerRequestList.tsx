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
} from "../apicalls/supabaseCalls/partnerRequestSupabaseCalls";

const PartnerRequestTable = React.memo(() => {
  const [partnerReqs, setPartnerReqs] = useState<any[]>([]);

  let partnerRequestsToVett;

  useEffect(() => {
    const getPartnerRequests = async () => {
      partnerRequestsToVett = await partnerRequests();
      partnerRequestsToVett ? setPartnerReqs(partnerRequestsToVett) : [];
    };

    getPartnerRequests();
  }, []);

  const ValidateRequest = async (id: string) => {
    updatePartnerRequestByUserId(id, true);
  };

  const RejectRequest = async (id: string) => {
    updatePartnerRequestByUserId(id, false);
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
                width: 200,
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
              <strong>Validate</strong>
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
                <TableCell align="center" style={{ height: 10 }}>
                  <Fab color="primary" aria-label="add">
                    <TaskAltIcon onClick={() => ValidateRequest(req.userId)} />
                  </Fab>
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
