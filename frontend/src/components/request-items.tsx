import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Control } from 'react-hook-form'
import { z } from 'zod'
import { formSchema } from './mat-request-form'
import { Button } from './ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'

interface RequestItemsProps {
  control: Control<z.infer<typeof formSchema>>
  fields: { id: string; [key: string]: any }[] // Ajusta según el tipo real de tus campos
  append: (value: any) => void
  remove: (index: number) => void
}

export function RequestItems({
  control,
  fields,
  append,
  remove
}: RequestItemsProps) {
  return (
    <div>
      <div className="flex justify-between items-center">
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

      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-4 items-start">
          <FormField
            control={control}
            name={`reqRow.${index}.quantity`}
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                    className="w-16 text-center"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
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
            control={control}
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
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
