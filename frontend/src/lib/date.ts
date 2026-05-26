import { format } from 'date-fns'

export function formatUtc(iso: string): string {
  return format(new Date(iso), 'PPpp')
}
