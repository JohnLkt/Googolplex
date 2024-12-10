import { toast } from 'react-toastify'

export const ReusableToast = (toastMessage: string) => {
  toast(`${toastMessage}`, {
    autoClose: 6000,
    hideProgressBar: true,
  })
}
