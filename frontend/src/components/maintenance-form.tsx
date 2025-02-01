import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import {
  maintenanceLogSchema,
  type MaintenanceLogFormValues
} from '@/lib/schema-maintenance'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MaintenanceForm() {
  const form = useForm<MaintenanceLogFormValues>({
    resolver: zodResolver(maintenanceLogSchema),
    defaultValues: {
      emitter: '',
      fault_description: '',
      issuing_department: '',
      maintenance_number: '',
      used_materials: '',
      maintenance_technician: '',
      result: '',
      observations: ''
    }
  })

  async function onSubmit(data: MaintenanceLogFormValues) {
    try {
      // Here you would typically send the data to your backend
      console.log(data)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      form.reset()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <>
      {/* <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Maintenance Log Form
        </CardTitle>
      </CardHeader> */}
      {/* <CardContent> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <FormField
                control={form.control}
                name="maintenance_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maintenance Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter maintenance number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date_of_maintenance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Maintenance</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={date =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emitter</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter emitter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="issuing_department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issuing Department</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter department name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maintenance_technician"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maintenance Technician</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter technician name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="fault_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fault Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the fault in detail"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="used_materials"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Used Materials</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List all materials used"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="result"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Result</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional observations (optional)"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="observations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observations</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Additional observations (optional)"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Submit Maintenance Log
            </Button>
          </form>
        </Form>
      {/* </CardContent> */}
    </>
  )
}
