import { Typography, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


export const Hours = (schedule) => {
  return (
    <TableContainer component={Paper} sx={{ marginTop: 2, boxShadow: 3 }}>
      <Table sx={{ minWidth: 350 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Day</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Operating Hours</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(schedule).map((day) => (
            <TableRow key={day}>
              <TableCell>
                <Chip label={day} size="small" color="primary" />
              </TableCell>
              <TableCell>
                {schedule[day] === 'Closed' ? (
                  <Typography sx={{ color: 'error.main' }}>Closed</Typography>
                ) : (
                  schedule[day].map((time, index) => (
                    <Typography key={index}>{time}</Typography>
                  ))
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

