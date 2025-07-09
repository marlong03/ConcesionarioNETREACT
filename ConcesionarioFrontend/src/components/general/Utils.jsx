export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export const formatoMonedaColombiana = (valor) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(
    valor
  );
