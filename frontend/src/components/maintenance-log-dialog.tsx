import React from 'react';
import { format } from 'date-fns'; // Asegúrate de tener date-fns instalada
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { repository } from '@/go/models';

interface MaintenanceLogDialogProps {
    selectedLog: repository.MaintenanceLog | null; // Objeto de registro de mantenimiento seleccionado
    onClose: () => void; // Función para cerrar el diálogo
}

const MaintenanceLogDialog: React.FC<MaintenanceLogDialogProps> = ({ selectedLog, onClose }) => {
    return (
        <Dialog open={!!selectedLog} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Detalles del registro de mantenimiento</DialogTitle>
                </DialogHeader>
                {selectedLog && (
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="font-medium">No. mantenimiento</label>
                                <p>{selectedLog.maintenance_number}</p>
                            </div>
                            <div>
                                <label className="font-medium">Fecha</label>
                                <p>{format(selectedLog.date_of_maintenance, "PPP")}</p>
                            </div>
                        </div>
                        <div>
                            <label className="font-medium">Emisor</label>
                            <p>{selectedLog.emitter}</p>
                        </div>
                        <div>
                            <label className="font-medium">Departamento</label>
                            <p>{selectedLog.issuing_department}</p>
                        </div>
                        <div>
                            <label className="font-medium">Descripción del fallo</label>
                            <p>{selectedLog.fault_description}</p>
                        </div>
                        <div>
                            <label className="font-medium">Materiales utilizados</label>
                            <p>{selectedLog.used_materials}</p>
                        </div>
                        <div>
                            <label className="font-medium">Tecnico</label>
                            <p>{selectedLog.maintenance_technician}</p>
                        </div>
                        <div>
                            <label className="font-medium">Resultado</label>
                            <p>{selectedLog.result}</p>
                        </div>
                        {selectedLog.observations && (
                            <div>
                                <label className="font-medium">Observaciones</label>
                                <p>{selectedLog.observations}</p>
                            </div>
                        )}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default MaintenanceLogDialog;
