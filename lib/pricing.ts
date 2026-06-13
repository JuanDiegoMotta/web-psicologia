// Comisión de la pasarela de pago (Bold) que se traslada al cliente.
// Se muestra DESGLOSADA en la página de checkout antes de cobrar.
// Fuente única: si cambia el %, se cambia aquí.
export const BOLD_COMMISSION_RATE = 0.05; // 5%

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
