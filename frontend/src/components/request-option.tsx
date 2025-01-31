import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Control } from 'react-hook-form'
import { z } from 'zod'
import { formSchema } from './mat-request-form'

interface RequestOptionsProps {
  control: Control<z.infer<typeof formSchema>>
  checkboxes: { id: string; label: string }[]
}

export function RequestOptions({ control, checkboxes }: RequestOptionsProps) {
  return (
    <div className="">
      <FormLabel className="text-base">Tipo de Solicitud</FormLabel>
      <FormDescription>
        Seleccione el tipo de solicitud que desea realizar.
      </FormDescription>

      <div className="flex gap-4 mt-4">
        {checkboxes.map(item => (
          <FormField
            key={item.id}
            control={control}
            name="checkBoxes"
            render={({ field }) => (
              <FormItem
                key={item.id}
                className="flex flex-row items-start space-x-3 space-y-0"
              >
                <FormControl>
                  <Checkbox
                    checked={field.value?.includes(item.id)}
                    onCheckedChange={checked => {
                      return checked
                        ? field.onChange([...field.value, item.id])
                        : field.onChange(
                            field.value?.filter(value => value !== item.id)
                          )
                    }}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  {item.label}
                </FormLabel>
              </FormItem>
            )}
          />
        ))}
      </div>
      <FormMessage />
    </div>
  )
}
