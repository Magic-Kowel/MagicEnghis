import PropTypes from "prop-types";
import { useState } from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  TablePagination,
  TableContainer,
  Table,
  Paper,
  TableHead,
  Typography,
  Box,
} from "@mui/material";
import StackTable from "./StackTable";
function DataTableCollapse({
  titleMain,
  dataList,
  collapseItem,
  listKeys,
  listTitles,
}) {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };
  const handleOpen = (index) => {
    if (selectedIndex.includes(index)) {
      setSelectedIndex(selectedIndex.filter((item) => item !== index));
    } else {
      setSelectedIndex([...selectedIndex, index]);
    }
  };
  return (
    <>
      <Paper
        sx={{
          boxShadow: 5,
          marginTop: "0.5rem",
          width: "100%",
          overflow: "hidden",
          paddingTop: "0.5rem",
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              {dataList.map((item, index) => (
                <>
                  <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => handleOpen(index)}
                      >
                        {selectedIndex.includes(index) ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>

                    <TableCell align="center" key={`${item.title}-${index}`}>
                      <Typography
                        margin={2}
                        textAlign="center"
                        sx={{ fontSize: "1.5rem" }}
                      >
                        {item[titleMain]}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={selectedIndex.includes(index)}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography
                            margin={1.2}
                            textAlign="center"
                            color="textSecondary"
                            width="auto"
                            sx={{ fontSize: "1.3rem" }}
                          >
                            {item.hint}
                          </Typography>

                          <Typography
                            margin={1.2}
                            textAlign="center"
                            color="textSecondary"
                            width="auto"
                            sx={{ fontSize: "1.3rem" }}
                          >
                            {item.difference}
                          </Typography>

                          <Typography
                            margin={1.2}
                            textAlign="center"
                            color="textSecondary"
                            width="auto"
                            sx={{ fontSize: "1.3rem" }}
                          >
                            {item.correct_usage}
                          </Typography>
                          <StackTable
                            dataList={item[collapseItem]}
                            listKeys={listKeys}
                            listTitles={listTitles}
                          />
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableHead>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={dataList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
DataTableCollapse.propTypes = {
  dataList: PropTypes.array.isRequired,
  titleMain: PropTypes.string.isRequired,
  collapseItem: PropTypes.string.isRequired,
  listKeys: PropTypes.array.isRequired,
  listTitles: PropTypes.array.isRequired,
};
export default DataTableCollapse;
