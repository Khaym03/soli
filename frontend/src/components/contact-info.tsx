import {
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control } from 'react-hook-form'
import { z } from 'zod'
import { formSchema } from './mat-request-form'

interface ContactInfoProps {
  control: Control<z.infer<typeof formSchema>>
}

export function ContactInfo({ control }: ContactInfoProps) {
  return (
    <>
      <FormField
        control={control}
        name="to"
        render={({ field }) => (
          <FormItem>
            {/* <FormLabel>Para</FormLabel> */}
            <FormControl>
              <Input placeholder="Para..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="from"
        render={({ field }) => (
          <FormItem>
            {/* <FormLabel>De</FormLabel> */}
            <FormControl>
              <Input placeholder="De..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
