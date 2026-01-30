/**
 * Validation d'un numéro Moov au Bénin.
 * Moov Bénin utilise les préfixes 01 55, 01 58, 01 60, 01 63, 01 64, 01 65, 01 68, 01 94, 01 95, 01 98, 01 99.
 * Format : 10 chiffres (ex. 0164909972) ou +229 + 10 chiffres.
 */
const PREFIXES_MOOV = ['0155', '0158', '0160', '0163', '0164', '0165', '0168', '0194', '0195', '0198', '0199']
const PAYS_BENIN = '229'

export function isNumeroMoovBenin(value) {
  if (!value || typeof value !== 'string') return false
  const digits = value.replace(/\D/g, '')
  if (digits.length === 10) {
    return PREFIXES_MOOV.some((p) => digits.startsWith(p))
  }
  if (digits.length === 13 && digits.startsWith(PAYS_BENIN)) {
    const sansPays = digits.slice(3)
    return PREFIXES_MOOV.some((p) => sansPays.startsWith(p))
  }
  return false
}

export function getNumeroMoovError(value) {
  if (!value || !value.trim()) return 'Indiquez votre numéro Moov.'
  const digits = value.replace(/\D/g, '')
  if (digits.length < 10) return 'Numéro trop court. Un numéro Moov Bénin compte 10 chiffres (ex. 0164909972).'
  if (digits.length > 13) return 'Numéro trop long.'
  if (!isNumeroMoovBenin(value)) {
    return 'Seuls les numéros Moov Bénin sont acceptés (préfixes 01 55, 01 58, 01 60, 01 63, 01 64, 01 65, 01 68, 01 94, 01 95, 01 98, 01 99). Ex. : 0164909972'
  }
  return null
}
