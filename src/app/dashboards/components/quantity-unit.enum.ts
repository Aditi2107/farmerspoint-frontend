
export enum QuantityUnitEnum {
    TON = 'TON',
    KILOGRAM = 'KILOGRAM',
    GRAM = 'GRAM',
    LITRE = 'LITRE',
    MILLILITRE = 'MILLILITRE'
  }
  
  export const QuantityUnitDisplay:{ [key in QuantityUnitEnum]: string }  = {
    [QuantityUnitEnum.TON]: 'Ton',
    [QuantityUnitEnum.KILOGRAM]: 'Kilogram',
    [QuantityUnitEnum.GRAM]: 'Gram',
    [QuantityUnitEnum.LITRE]: 'Litre',
    [QuantityUnitEnum.MILLILITRE]: 'Millilitre'
  };