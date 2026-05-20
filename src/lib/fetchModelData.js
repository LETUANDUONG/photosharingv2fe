export async function fetchModel(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
    throw error;
  }
}