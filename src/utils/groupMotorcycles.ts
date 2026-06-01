// Tipo de uma motocicleta individual
export type Motorcycle = {
  id: string;
  brand: string;
  model: string;
  year: number;
  category: string;
};

// Tipo de uma secao no formato que a SectionList espera
export type MotorcycleSection = {
  title: string;
  data: Motorcycle[];
};

// Agrupa um array plano de motos em secoes por categoria
export function groupByCategory(motorcycles: Motorcycle[]): MotorcycleSection[] {
  const groups: { [category: string]: Motorcycle[] } = {};

  motorcycles.forEach((moto) => {
    if (!groups[moto.category]) {
      groups[moto.category] = [];
    }
    groups[moto.category].push(moto);
  });

  return Object.keys(groups)
    .sort()
    .map((category) => ({
      title: category,
      data: groups[category],
    }));
}
