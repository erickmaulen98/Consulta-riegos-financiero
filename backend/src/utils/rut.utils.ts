

function isValidRut(rut: string): boolean {

  const cleanedRut = rut.replace(/\./g, '').replace(/-/g, '');
    if (cleanedRut.length < 8 || cleanedRut.length > 9) {
    return false;
  }
  return true;
}


export function formatRut(rut: string): string {
  const cleanedRut = rut.replace(/\./g, '').replace(/-/g, '');
    if (cleanedRut.length < 8 || cleanedRut.length > 9) {
    throw new Error('Invalid RUT length');
    }

    const rutFormatted = cleanedRut.toUpperCase();

    return rutFormatted;
}

export function sameRut(rut1: string, rut2: string): boolean {
  const cleanedRut1 = rut1.replace(/\./g, '').replace(/-/g, '');
  const cleanedRut2 = rut2.replace(/\./g, '').replace(/-/g, '');

    return cleanedRut1 === cleanedRut2;

}
