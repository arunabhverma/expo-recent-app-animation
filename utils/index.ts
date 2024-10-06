export function getRandomSoftColor() {
    const r = Math.floor(Math.random() * 56);
    const g = Math.floor(Math.random() * 56);
    const b = Math.floor(Math.random() * 56);
  
    return `rgb(${r}, ${g}, ${b})`;
  }