// import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { Card } from './ui/card'
import { ContactInfo } from './contact-info'
import { RequestOptions } from './request-option'

// type RequestRow = {
//   quantity: number
//   description: string
//   justification: string
// }

export const formSchema = z.object({
  to: z.string().min(3, {
    message: 'Emitter must be at least 3 characters.'
  }),
  from: z.string().min(3, {
    message: 'Description must be at least 10 characters.'
  }),
  service: z.boolean().default(false),
  materials: z.boolean().default(false),
  equipment: z.boolean().default(false),
  checkBoxes: z.array(z.string()).refine(value => value.some(item => item), {
    message: 'You have to select at least one item.'
  }),
  reqRow: z
    .array(
      z.object({
        quantity: z.number().min(1, {
          message: 'La cantidad debe ser al menos 1.'
        }),
        description: z.string().min(3, {
          message: 'La descripción debe tener al menos 3 caracteres.'
        }),
        justification: z.string().min(3, {
          message: 'La justificación debe tener al menos 3 caracteres.'
        })
      })
    )
    .min(1, { message: 'Agrega al menos un item' })
})

const checkboxes = [
  {
    id: 'materials',
    label: 'Materiales',
    value: 'materials'
  },
  {
    id: 'equipment',
    label: 'Equipo',
    value: 'equipment'
  },
  {
    id: 'service',
    label: 'Servicio',
    value: 'service'
  }
]

export function MaterialsRequestForm() {
  // const [rows, setRows] = useState<RequestRow[]>([
  //   { quantity: 1, description: '', justification: '' }
  // ])

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      to: '',
      from: '',
      checkBoxes: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'reqRow'
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row gap-8 w-full max-w-screen-xl  overflow-hidden"
      >
        <div className="flex flex-col gap-8 grow">
          <Card className="flex gap-4 p-6">
            <div className='flex flex-col gap-4'>
            <ContactInfo control={form.control} />
            </div>

            {/* opciones */}
            <RequestOptions control={form.control} checkboxes={checkboxes} />
          </Card>

          {/* second col  */}

          <Card className="flex flex-col p-6 grow shadow-none">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h3 className="text-lg font-semibold">Items</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({ quantity: 1, description: '', justification: '' })
                }
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>

            {/* array fields */}
            <div className="h-[333px]  overflow-y-auto">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4">
                  <FormField
                    control={form.control}
                    name={`reqRow.${index}.quantity`}
                    render={({ field }) => (
                      <FormItem className="">
                        <FormLabel>Cantidad</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            onChange={e =>
                              field.onChange(Number(e.target.value))
                            }
                            className="w-16 text-center"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`reqRow.${index}.description`}
                    render={({ field }) => (
                      <FormItem className="flex-[2]">
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Textarea className="min-h-9 h-9" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`reqRow.${index}.justification`}
                    render={({ field }) => (
                      <FormItem className="flex-[2]">
                        <FormLabel>Justificación</FormLabel>
                        <FormControl>
                          <Textarea className="min-h-9 h-9" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="mt-8"
                      onClick={() => remove(index)}
                    >
                      <Trash2 className="h-9" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {form.formState.errors.reqRow?.message && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.reqRow.message}
              </p>
            )}
          </Card>
        </div>
        <div className="flex flex-col gap-8">
          <Button className=" aspect-square h-20" type="submit">
            Guardar
          </Button>
          <Button
            variant={'outline'}
            className=" aspect-square h-20"
            onClick={() => form.reset()}
            type="reset"
          >
            Reset
          </Button>
        </div>
      </form>
    </Form>
  )
}
