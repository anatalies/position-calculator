'use server'

export async function recordTrade(formData:FormData) {
  const rawFormData = {
    pair: formData.get('pair'),
    lotSize: formData.get('lotSize'),
    profit: formData.get('profit'),
    entryPrice: formData.get('entryPrice'),
    exitPrice: formData.get('exitPrice')
  }

  console.log(rawFormData)
}