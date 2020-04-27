export const singularPlural = (numero, singular, plural) => {
  if (numero > 1) {
    return plural
  }
  return singular
}

export const handleValorPorcetagem = (linha) => `${(linha * 100).toFixed(2)}%`

export const validarEmail = (email) => {
  const usuario = email.substring(0, email.indexOf('@'))
  const dominio = email.substring(email.indexOf('@') + 1, email.length)

  if ((usuario.length >= 1) &&
    (dominio.length >= 3) &&
    (usuario.search('@') === -1) &&
    (dominio.search('@') === -1) &&
    (usuario.search(' ') === -1) &&
    (dominio.search(' ') === -1) &&
    (dominio.search('.') !== -1) &&
    (dominio.indexOf('.') >= 1) &&
    (dominio.lastIndexOf('.') < dominio.length - 1)) {
    return true
  } else {
    return false
  }
}
