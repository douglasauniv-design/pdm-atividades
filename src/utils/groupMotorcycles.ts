// Tipo base de uma motocicleta (sem a categoria)
export type Motorcycle = {
  id: string;
  brand: string;
  model: string;
  year: number;
};

// Tipo dos dados planos: cada moto + a propriedade category (interseção com &)
export type FlatListData = (Motorcycle & { category: string })[];

// Tipo dos dados seccionados que a SectionList espera
export type SectionListData = {
  title: string;
  data: Motorcycle[];
}[];

// Converte o array plano em dados agrupados por categoria
export function convertData(arrayData: FlatListData): SectionListData {
  let result: SectionListData = [];

  arrayData.forEach((motorcycle) => {
    // Procura se ja existe uma secao com essa categoria
    const cat = result.find((r) => r.title === motorcycle.category);

    if (cat) {
      // Se a secao existe, adiciona a moto nela
      cat.data.push(motorcycle);
    } else {
      // Se nao existe, cria uma nova secao com essa moto
      const newCat = {
        title: motorcycle.category,
        data: [motorcycle],
      };
      result.push(newCat);
    }
  });

  return result;
}
