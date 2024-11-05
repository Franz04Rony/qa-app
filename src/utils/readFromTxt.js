const link = "./preguntas.txt"
/**
 * Leer texto de un txt
 * @param {state} text
 * @param {useState} setText 
 */
export const main = async(text, setText) => {
    const file = await fetch(link).then((res) => res.text())
    setText(file)
  }