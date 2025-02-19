// app/api/products/route.js
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
  
    const products = Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 100),
    }));
  
    const hasNextPage = page < 5; // Mock pagination logic
  
    return Response.json({ products, hasNextPage });
  }