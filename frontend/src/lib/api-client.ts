import axios, { AxiosError } from 'axios'

import { env } from '@/config/env'
import type { ApiErrorPayload } from '@/types/api'
import { ApiError } from '@/types/api'

const apiClient = axios.create({
  baseURL: env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorPayload>) => {
    const status = error.response?.status ?? 500
    const payload = error.response?.data
    const message = payload?.message ?? error.message ?? 'Unexpected API error'
    throw new ApiError(message, status, payload?.code)
  },
)

export { apiClient }
