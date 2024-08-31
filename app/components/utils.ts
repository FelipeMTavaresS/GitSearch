export const formatNumber = (value: number): string => {
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1).replace(".0", "") + "M";
    if (value >= 1_000) return (value / 1_000).toFixed(1).replace(".0", "") + "k";
    return value.toString();
  };
  
  export const formatTextDesc = (value: string): string => {
    if (!value) return "Não possui descrição";
  
    const maxLength = 20;
    const maxLineLength = 12;
    const truncatedText = value.length > maxLength ? value.slice(0, maxLength) + '...' : value;
    return wrapText(truncatedText, maxLineLength);
  };
  
  export const formatTextTitle = (value: string): string => {
    if (!value) return "Sem título";
  
    const maxLineLength = 15;
    return wrapText(value, maxLineLength);
  };
  
  export const wrapText = (text: string, maxLineLength: number): string => {
    const lines: string[] = [];
    let currentLine = '';
  
    for (const char of text) {
      currentLine += char;
      if (currentLine.length >= maxLineLength) {
        lines.push(currentLine.trim());
        currentLine = '';
      }
    }
  
    if (currentLine.length) lines.push(currentLine.trim());
    return lines.join('\n');
  };
  
  export const fetchUserData = async (url: string) => {
    const response = await fetch(url);
    return response.json();
  };