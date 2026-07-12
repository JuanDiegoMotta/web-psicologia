// Comisión de la pasarela de pago (Bold) que se traslada al cliente.
// Se muestra DESGLOSADA en la página de checkout antes de cobrar.
// Fuente única: si cambia el %, se cambia aquí.
export const BOLD_COMMISSION_RATE = 0.05; // 5%

// Importe mínimo que acepta Bold por transacción (COP). Por debajo de esto el
// botón falla con BTN-001. Se valida el TOTAL (base + comisión) contra este mínimo.
export const BOLD_MIN_AMOUNT_COP = 1000;

// Normaliza un importe escrito a mano a un entero de COP. Clave en Colombia:
// los miles se escriben con punto ("140.000" = ciento cuarenta mil), pero
// Number("140.000") === 140. Aquí nos quedamos solo con los dígitos, así
// "140.000", "140000" y "$140.000 COP" dan todos 140000. COP no tiene decimales.
export function parseCopAmount(input: unknown): number {
  const digits = String(input ?? '').replace(/\D/g, '');
  return digits ? parseInt(digits, 10) : 0;
}

export type PriceBreakdown = {
  base: number; // precio publicado de la guía (COP)
  commission: number; // comisión de Bold (COP, redondeada)
  total: number; // lo que se cobra realmente = base + commission
};

// Calcula el desglose garantizando que base + commission === total (sin descuadres por redondeo).
export function computeBreakdown(base: number): PriceBreakdown {
  const commission = Math.round(base * BOLD_COMMISSION_RATE);
  return { base, commission, total: base + commission };
}
