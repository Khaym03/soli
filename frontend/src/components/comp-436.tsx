import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Box, ServerCog } from 'lucide-react'
import { MaintenanceForm } from './maintenance-form'
import { MaterialsRequestForm } from './mat-request-form'
// import { MaintenanceTable } from './maintenance-table'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import MaintenanceTable from './table-mtto'
import MaintenanceCtxProvider from './maintenance-ctx'

export default function RootLayout() {
  return (
    <Tabs defaultValue="tab-1">
      <ScrollArea className="">
        <TabsList className="relative mb-3 h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border">
          <TabsTrigger
            value="tab-1"
            className="overflow-hidden rounded-b-none border-x border-t border-border bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
          >
            <Box
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Solicitud de materiales
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="overflow-hidden rounded-b-none border-x border-t border-border bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
          >
            <ServerCog
              className="-ms-0.5 me-1.5 opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            Matenimiento
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="tab-1">
        <div className="flex justify-center items-center w-full h-full overflow-x-hidden  px-10">
          <MaterialsRequestForm />
        </div>
      </TabsContent>
      <TabsContent value="tab-2">
        <MaintenanceCtxProvider>
          <div className="h-full bg-muted/40 px-8">
            <div className="grid grid-cols-1  gap-4 ">
              <Card className="h-[calc(100vh-100px)] w-full mx-auto shadow-none overflow-y-auto">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-center">
                    Registro de Mantenimiento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 ">
                  <MaintenanceForm />
                  <MaintenanceTable />
                </CardContent>
              </Card>
            </div>
          </div>
        </MaintenanceCtxProvider>
      </TabsContent>
      {/* <TabsContent value="tab-3">
        <p className="p-4 pt-1 text-center text-xs text-muted-foreground">
          Content for Tab 3
        </p>
      </TabsContent> */}
    </Tabs>
  )
}
