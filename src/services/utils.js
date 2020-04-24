export const singularPlural = (numero, singular, plural) => {
  if (numero > 1) {
    return plural
  }
  return singular
}

export const handleValorPorcetagem = (linha) => `${(linha * 100).toFixed(2)}%`
