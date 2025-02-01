import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search, Edit, Trash2 } from "lucide-react";
import { MaintenanceLogFormValues } from "@/lib/schema-maintenance";
import { maintenanceLogs } from "@/lib/data";
import { Card } from "./ui/card";

type MaintenanceLog = MaintenanceLogFormValues & { id: string };

export function MaintenanceTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLog, setSelectedLog] = useState<MaintenanceLog | null>(null);

  const filteredLogs = maintenanceLogs.filter((log) =>
    log.maintenance_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (log: MaintenanceLog) => {
    console.log("Edit log:", log);
    // Implement edit functionality
  };

  const handleDelete = (log: MaintenanceLog) => {
    console.log("Delete log:", log);
    // Implement delete functionality
  };

  return (
    <>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by maintenance number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Maintenance #</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell
                  className="font-medium cursor-pointer hover:text-primary"
                  onClick={() => setSelectedLog(log)}
                >
                  {log.maintenance_number}
                </TableCell>
                <TableCell>
                  {format(log.date_of_maintenance, "MMM d, yyyy")}
                </TableCell>
                <TableCell>{log.maintenance_technician}</TableCell>
                <TableCell>{log.issuing_department}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(log)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(log)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Maintenance Log Details</DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-medium">Maintenance Number</label>
                  <p>{selectedLog.maintenance_number}</p>
                </div>
                <div>
                  <label className="font-medium">Date</label>
                  <p>{format(selectedLog.date_of_maintenance, "PPP")}</p>
                </div>
              </div>
              <div>
                <label className="font-medium">Emitter</label>
                <p>{selectedLog.emitter}</p>
              </div>
              <div>
                <label className="font-medium">Department</label>
                <p>{selectedLog.issuing_department}</p>
              </div>
              <div>
                <label className="font-medium">Fault Description</label>
                <p>{selectedLog.fault_description}</p>
              </div>
              <div>
                <label className="font-medium">Used Materials</label>
                <p>{selectedLog.used_materials}</p>
              </div>
              <div>
                <label className="font-medium">Technician</label>
                <p>{selectedLog.maintenance_technician}</p>
              </div>
              <div>
                <label className="font-medium">Result</label>
                <p>{selectedLog.result}</p>
              </div>
              {selectedLog.observations && (
                <div>
                  <label className="font-medium">Observations</label>
                  <p>{selectedLog.observations}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}